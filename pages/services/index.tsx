import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import SiteLayout from "@/components/site/SiteLayout";
import PageHero from "@/components/site/PageHero";
import { Closing } from "@/components/site/Contact";
import { ALONGSIDE, PROCESS, SERVICES, STACK } from "@/constants/pages";
import site from "@/styles/site.module.css";
import styles from "@/styles/pages.module.css";

export default function ServicesPage() {
  return (
    <SiteLayout
      title="Services · Wayber Technologies"
      description="Web platforms, mobile apps, fintech systems, product design, consultancy and audits, analytics, and brand and growth, from one Lagos studio."
    >
      <PageHero
        eyebrow="Services"
        title="Services"
        summary="Strategy, design and engineering in one team. Bring us one piece, or the whole problem."
      />

      <section aria-label="What we do" className={styles.serviceList}>
        <div className={site.container}>
          {SERVICES.map((s) => (
            <article key={s.number} className={styles.serviceRow}>
              <span className={styles.serviceNumber}>{s.number}</span>
              <div>
                <h2 className={styles.serviceTitle}>{s.title}</h2>
                <p className={styles.serviceBody}>{s.body}</p>
              </div>
              <div className={styles.serviceSide}>
                <ul className={styles.examples} aria-label={`${s.title}: typical work`}>
                  {s.examples.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
                {s.caseStudy && (
                  <Link href={s.caseStudy.href} className={site.textLink}>
                    {s.caseStudy.label} <ArrowRightIcon className={site.go} />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={site.section} aria-labelledby="process-title">
        <div className={site.container}>
          <div className={site.sectionHead}>
            <h2 id="process-title" className={site.sectionTitle}>
              How a project runs
              <br />
              <span className={site.grey}>from first call to long after launch.</span>
            </h2>
            <p className={site.sectionLead}>
              Four stages, one team the whole way through. You talk to the people building your product, not a relay.
            </p>
          </div>
          <ol className={styles.processGrid} style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {PROCESS.map((p, i) => (
              <li key={p.number} className={`${styles.processCard} ${i === PROCESS.length - 1 ? styles.processCardDark : ""}`}>
                <span className={styles.processNumber}>{p.number}</span>
                <span>
                  <span className={styles.processTitle}>{p.title}</span>
                  <span className={styles.processBody}>{p.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={site.section} aria-labelledby="alongside-title">
        <div className={site.container}>
          <div className={site.sectionHead}>
            <h2 id="alongside-title" className={site.sectionTitle}>
              Building technology is a lot.
              <br />
              <span className={site.grey}>We stay with you through it.</span>
            </h2>
          </div>
          <div className={styles.trio}>
            {ALONGSIDE.map((a) => (
              <div key={a.when} className={styles.trioItem}>
                <span className={styles.trioTitle}>{a.when}</span>
                <p className={styles.trioBody}>{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={site.section} aria-labelledby="stack-title">
        <div className={site.container}>
          <div className={site.sectionHead} style={{ marginBottom: 32 }}>
            <h2 id="stack-title" className={site.sectionTitle}>
              Tools we build with
              <span className={site.dot}>.</span>
            </h2>
            <p className={site.sectionLead}>We pick the stack for the problem and for the team that will run it after us.</p>
          </div>
          <div className={site.chips} style={{ marginTop: 0 }}>
            {STACK.map((t) => (
              <span key={t} className={site.chip}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Closing />
    </SiteLayout>
  );
}
