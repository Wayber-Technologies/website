import type { NextApiRequest, NextApiResponse } from "next";
import { clientIp, rateLimit } from "@/lib/rateLimit";

// Sends contact-form enquiries by email through Resend (https://resend.com).
//
// Environment variables:
//   RESEND_API_KEY  required. Without it this route returns 501 and the form
//                   opens the visitor's email app instead.
//   CONTACT_TO      inbox that receives enquiries (default office@waybertechnologies.com)
//   CONTACT_FROM    sender on a domain verified in the SAME Resend account as the key,
//                   e.g. "Wayber Website <website@waybertechnologies.com>"
//
// Abuse protection: a hidden honeypot field, a minimum fill time, per-IP and
// per-email rate limits (see lib/rateLimit.ts), and a small body size limit.

export const config = { api: { bodyParser: { sizeLimit: "16kb" } } };

// At most 5 submissions per IP every 10 minutes, and 3 per email address an hour.
const PER_IP = { limit: 5, windowMs: 10 * 60_000 };
const PER_EMAIL = { limit: 3, windowMs: 60 * 60_000 };
// A person takes longer than this to fill in the form; scripts usually don't.
const MIN_FILL_MS = 3000;

/** Explains common Resend failures in the server log, so they are easy to fix. */
function explainResendError(status: number, body: string) {
  if (status === 401) return "API key is missing or invalid (check RESEND_API_KEY).";
  if (status === 403 && /domain/i.test(body))
    return "the sender domain isn't verified in this Resend account (check CONTACT_FROM and the account's domains).";
  if (status === 403) return "the API key isn't allowed to send (check its permissions in Resend).";
  if (status === 422) return "Resend rejected the email fields (often a malformed CONTACT_FROM).";
  if (status === 429) return "Resend's own rate limit or daily quota was hit.";
  return "unexpected response.";
}

const LIMITS = { name: 120, email: 200, company: 160, interest: 80, budget: 40, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const ip = clientIp(req.headers);
  const ipCheck = rateLimit(`contact:ip:${ip}`, PER_IP.limit, PER_IP.windowMs);
  if (!ipCheck.ok) {
    res.setHeader("Retry-After", String(ipCheck.retryAfter));
    return res.status(429).json({ error: "Too many messages from your connection. Please try again in a few minutes." });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;

  // Bots fill every field, including the hidden one, and submit instantly.
  // Pretend it worked so they don't learn to adapt.
  const startedAt = Number(body.startedAt);
  const tooFast = Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS;
  if (clean(body.website, 200) || tooFast) return res.status(200).json({ ok: true });

  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const company = clean(body.company, LIMITS.company);
  const interest = clean(body.interest, LIMITS.interest);
  const budget = clean(body.budget, LIMITS.budget);
  const message = clean(body.message, LIMITS.message);

  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return res.status(400).json({ error: "Please add your name, a valid email and a short message." });
  }

  const emailCheck = rateLimit(`contact:email:${email.toLowerCase()}`, PER_EMAIL.limit, PER_EMAIL.windowMs);
  if (!emailCheck.ok) {
    res.setHeader("Retry-After", String(emailCheck.retryAfter));
    return res.status(429).json({ error: "We’ve already received a few messages from this address. We’ll be in touch soon." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return res.status(501).json({ error: "not_configured" });

  const to = process.env.CONTACT_TO || "office@waybertechnologies.com";
  const from = process.env.CONTACT_FROM || "Wayber Website <onboarding@resend.dev>";

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Company", company || "—"],
    ["Interested in", interest || "—"],
    ["Budget", budget || "—"],
  ];

  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${message}`;
  const html = `<table cellpadding="4">${rows
    .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`)
    .join("")}</table><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New enquiry: ${interest || "Project"} from ${name}`,
        text,
        html,
      }),
    });
    if (!r.ok) {
      const detail = await r.text();
      console.error(`Contact form: Resend refused to send (${r.status}): ${explainResendError(r.status, detail)}`, detail);
      return res.status(502).json({ error: "We couldn’t send your message just now." });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Resend request failed", err);
    return res.status(502).json({ error: "We couldn’t send your message just now." });
  }
}
