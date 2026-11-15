import type { NextApiRequest, NextApiResponse } from "next";

// Sends contact-form enquiries by email through Resend (https://resend.com).
//
// Environment variables:
//   RESEND_API_KEY  required. Without it this route returns 501 and the form
//                   opens the visitor's email app instead.
//   CONTACT_TO      inbox that receives enquiries (default office@waybertechnologies.com)
//   CONTACT_FROM    verified sender, e.g. "Wayber Website <website@waybertechnologies.com>"

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

  const body = (req.body ?? {}) as Record<string, unknown>;

  // Bots fill every field, including the hidden one. Pretend it worked.
  if (clean(body.website, 200)) return res.status(200).json({ ok: true });

  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const company = clean(body.company, LIMITS.company);
  const interest = clean(body.interest, LIMITS.interest);
  const budget = clean(body.budget, LIMITS.budget);
  const message = clean(body.message, LIMITS.message);

  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return res.status(400).json({ error: "Please add your name, a valid email and a short message." });
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
      console.error("Resend error", r.status, await r.text());
      return res.status(502).json({ error: "We couldn’t send your message just now." });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Resend request failed", err);
    return res.status(502).json({ error: "We couldn’t send your message just now." });
  }
}
