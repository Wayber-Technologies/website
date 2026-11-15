import SiteLayout from "@/components/site/SiteLayout";
import PageHero from "@/components/site/PageHero";
import ContactForm from "@/components/site/ContactForm";
import { CONTACT, SOCIAL } from "@/constants/home";
import { FAQ } from "@/constants/pages";
import site from "@/styles/site.module.css";
import styles from "@/styles/pages.module.css";

export default function ContactPage() {
  return (
    <SiteLayout
      title="Contact · Wayber Technologies"
      description="Tell Wayber Technologies what you are building. Email office@waybertechnologies.com or call +234 808 061 2291."
    >
      <PageHero
        eyebrow="Contact"
        title="Let’s talk"
        summary="Tell us what you’re building, even if it’s only an idea. We read every message ourselves."
      />

      <section aria-label="Get in touch">
        <div className={`${site.container} ${styles.contactGrid}`}>
          <ContactForm />

          <aside className={styles.details} aria-label="Contact details">
            <div className={styles.detail}>
              <span className={styles.detailLabel}>New projects &amp; partnerships</span>
              <a className={styles.detailValue} href={`mailto:${CONTACT.officeEmail}`}>
                {CONTACT.officeEmail}
              </a>
            </div>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>Technical questions &amp; support</span>
              <a className={styles.detailValue} href={`mailto:${CONTACT.technologyEmail}`}>
                {CONTACT.technologyEmail}
              </a>
            </div>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>Phone</span>
              <a className={styles.detailValue} href={CONTACT.phoneHref}>
                {CONTACT.phoneDisplay}
              </a>
            </div>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>Office</span>
              <span className={styles.detailValue}>{CONTACT.address}</span>
            </div>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>Elsewhere</span>
              <span className={styles.detailHint}>
                {SOCIAL.map((s, i) => (
                  <span key={s.label}>
                    {i > 0 && " · "}
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className={site.textLink}>
                      {s.label}
                    </a>
                  </span>
                ))}
              </span>
            </div>
          </aside>
        </div>
      </section>

      <section className={site.section} aria-labelledby="faq-title" style={{ paddingBottom: 140 }}>
        <div className={site.container}>
          <div className={site.sectionHead} style={{ marginBottom: 32 }}>
            <h2 id="faq-title" className={site.sectionTitle}>
              Got questions?
              <br />
              <span className={site.grey}>We’ve got answers.</span>
            </h2>
          </div>
          <div className={styles.faq}>
            {FAQ.map((item) => (
              <details key={item.q} className={styles.faqItem}>
                <summary>
                  {item.q}
                  <span className={styles.faqIcon} aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className={styles.faqAnswer}>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
