import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { CONTACT } from "@/constants/home";
import styles from "@/styles/site.module.css";

const MARK_PATH =
  "M898.796 173.928L674.342 300.432V112.251L629.271 87.0405L404.817 213.545V25.3641L359.746 0.15332L0.0791016 203.19V494.015L45.6009 519.676L269.604 393.172V580.902L315.126 606.563L539.129 480.059V667.789L584.651 693L943.417 490.863V199.139L898.796 173.928Z";

export default function Contact() {
  return (
    <>
      <section id="start" className={styles.start}>
        <div className={`${styles.container} ${styles.startGrid}`}>
          <div className={styles.startCard}>
            <div>
              <span className={styles.startKicker}>New product</span>
              <h3 className={styles.startTitle}>Building something new?</h3>
              <p className={styles.startBody}>
                Send us the idea, who it’s for and your deadline. Rough notes are fine.
              </p>
            </div>
            <div className={styles.startFoot}>
              <Link href="/contact" className={`${styles.pill} ${styles.pillBlue}`}>
                Start a project <ArrowRightIcon className={styles.go} />
              </Link>
              <span className={styles.startEmail}>{CONTACT.officeEmail}</span>
            </div>
          </div>

          <div className={`${styles.startCard} ${styles.startCardDark}`}>
            <div>
              <span className={styles.startKicker}>Existing systems</span>
              <h3 className={styles.startTitle}>Software you already run?</h3>
              <p className={styles.startBody}>
                Audits, rebuilds and ongoing support. This goes straight to our engineering team.
              </p>
            </div>
            <div className={styles.startFoot}>
              <a href={`mailto:${CONTACT.technologyEmail}`} className={`${styles.pill} ${styles.pillWhite}`}>
                Talk to engineering <ArrowRightIcon className={styles.go} />
              </a>
              <span className={styles.startEmail}>{CONTACT.technologyEmail}</span>
            </div>
          </div>
        </div>
      </section>

      <Closing />
    </>
  );
}

export function Closing() {
  return (
    <>
      {/* Grid lines here echo the hero, so every page opens and closes on the same blueprint. */}
      <section className={`${styles.closing} ${styles.gridBg}`}>
        <div className={`${styles.narrow} ${styles.closingInner}`}>
          <svg width="64" height="47" viewBox="0 0 944 693" aria-hidden="true">
            <path d={MARK_PATH} fill="#1462FF" />
          </svg>
          <h2 className={styles.closingTitle}>
            Got something to build<span className={styles.dot}>?</span>
          </h2>
          <p className={styles.closingLead}>
            Tell us what you’re trying to fix and when you need it by. Email or phone, whichever is easier.
          </p>
          <a href={`mailto:${CONTACT.officeEmail}`} className={styles.closingEmail}>
            {CONTACT.officeEmail}
          </a>
          <a href={CONTACT.phoneHref} className={styles.closingPhone}>
            or call {CONTACT.phoneDisplay}
          </a>
        </div>
      </section>
    </>
  );
}
