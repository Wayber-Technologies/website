import { useRef, useState, type FormEvent } from "react";
import { BUDGETS, INTERESTS } from "@/constants/pages";
import { CONTACT } from "@/constants/home";
import site from "@/styles/site.module.css";
import styles from "@/styles/pages.module.css";
import PillLabel from "@/components/site/PillLabel";

// "offline": the server can't send email right now (not configured); the visitor
// is told, and can send the same message from their own email app.
type Status = "idle" | "sending" | "sent" | "error" | "offline";

type Fields = {
  name: string;
  email: string;
  company: string;
  interest: string;
  budget: string;
  message: string;
  website: string; // honeypot: real people never see or fill this
};

const EMPTY: Fields = { name: "", email: "", company: "", interest: INTERESTS[0], budget: BUDGETS[2], message: "", website: "" };

function mailtoFallback(f: Fields) {
  const subject = `New project enquiry from ${f.name}`;
  const body = [
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    f.company && `Company: ${f.company}`,
    `Interested in: ${f.interest}`,
    `Budget: ${f.budget}`,
    "",
    f.message,
  ]
    .filter((line) => line !== "")
    .join("\n");
  return `mailto:${CONTACT.officeEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ContactForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  // When the form was shown, so the server can drop instant (bot) submissions.
  const startedAt = useRef(Date.now());

  const set = (key: keyof Fields) => (e: { target: { value: string } }) =>
    setFields((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, startedAt: startedAt.current }),
      });
      if (res.ok) {
        setStatus("sent");
        return;
      }
      if (res.status === 501) {
        // Email sending isn't configured on this deployment. Say so on the page and
        // offer the visitor's email app, instead of switching apps without warning.
        setStatus("offline");
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong.");
      setStatus("error");
    } catch {
      setError("We couldn’t reach the server.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className={styles.sent} role="status">
        <h2 className={styles.sentTitle}>
          Thanks, {fields.name.split(" ")[0]}<span className={site.dot}>.</span>
        </h2>
        <p className={styles.sentBody}>
          Your message is with the team. We read every enquiry ourselves and will reply to {fields.email}.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate={false}>
      <div>
        <label className={styles.label} htmlFor="name">
          Your name
        </label>
        <input id="name" className={styles.input} required autoComplete="name" maxLength={120} value={fields.name} onChange={set("name")} />
      </div>
      <div>
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input id="email" type="email" className={styles.input} required autoComplete="email" maxLength={200} value={fields.email} onChange={set("email")} />
      </div>
      <div className={styles.fieldFull}>
        <label className={styles.label} htmlFor="company">
          Company <span className={styles.optional}>(optional)</span>
        </label>
        <input id="company" className={styles.input} autoComplete="organization" maxLength={160} value={fields.company} onChange={set("company")} />
      </div>
      <div>
        <label className={styles.label} htmlFor="interest">
          What are you interested in?
        </label>
        <select id="interest" className={styles.input} value={fields.interest} onChange={set("interest")}>
          {INTERESTS.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={styles.label} htmlFor="budget">
          Project budget
        </label>
        <select id="budget" className={styles.input} value={fields.budget} onChange={set("budget")}>
          {BUDGETS.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      <div className={styles.fieldFull}>
        <label className={styles.label} htmlFor="message">
          What are you building?
        </label>
        <textarea
          id="message"
          className={styles.input}
          required
          minLength={10}
          maxLength={5000}
          placeholder="A few lines is plenty: the problem, who it’s for, and any deadline."
          value={fields.message}
          onChange={set("message")}
        />
      </div>
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" tabIndex={-1} autoComplete="off" value={fields.website} onChange={set("website")} />
      </div>

      {status === "offline" && (
        <div className={`${styles.status} ${styles.statusNotice}`} role="alert">
          <p className={styles.statusText}>
            Your message hasn’t been sent: our form can’t send email right now. Send it from your email app
            instead; we’ve filled it in for you.
          </p>
          <a href={mailtoFallback(fields)} className={`${site.pill} ${site.pillSmall} ${site.pillInk}`}>
            <PillLabel>Open in email app</PillLabel>
          </a>
        </div>
      )}

      {status === "error" && (
        <p className={`${styles.status} ${styles.statusError}`} role="alert">
          {error} You can also email us at <a href={mailtoFallback(fields)}>{CONTACT.officeEmail}</a>.
        </p>
      )}

      <div className={styles.formFoot}>
        <button type="submit" className={`${site.pill} ${site.pillBlue} ${styles.submit}`} disabled={status === "sending"}>
          <PillLabel>{status === "sending" ? "Sending…" : "Send message"}</PillLabel>
        </button>
        <span className={styles.formNote}>Goes straight to {CONTACT.officeEmail}</span>
      </div>
    </form>
  );
}
