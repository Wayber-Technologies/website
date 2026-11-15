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
              <span className={styles.startKicker}>For founders</span>
              <h3 className={styles.startTitle}>
                Ship the first version
                <br />
                <span className={styles.grey}>without cutting corners.</span>
              </h3>
            </div>
            <div className={styles.startFoot}>
              <a href={`mailto:${CONTACT.officeEmail}`} className={`${styles.pill} ${styles.pillBlue}`}>
                Start a project
              </a>
              <span className={styles.startEmail}>{CONTACT.officeEmail}</span>
            </div>
          </div>

          <div className={`${styles.startCard} ${styles.startCardDark}`}>
            <div>
              <span className={styles.startKicker}>For organisations</span>
              <h3 className={styles.startTitle}>
                Modernise what you run
                <br />
                <span className={styles.grey}>without stopping it.</span>
              </h3>
            </div>
            <div className={styles.startFoot}>
              <a href={`mailto:${CONTACT.technologyEmail}`} className={`${styles.pill} ${styles.pillWhite}`}>
                Talk to engineering
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
      <section className={styles.closing}>
        <div className={`${styles.narrow} ${styles.closingInner}`}>
          <svg width="64" height="47" viewBox="0 0 944 693" aria-hidden="true">
            <path d={MARK_PATH} fill="#1462FF" />
          </svg>
          <h2 className={styles.closingTitle}>
            Got something to build<span className={styles.dot}>?</span>
          </h2>
          <p className={styles.closingLead}>
            Even if it is only an idea. Tell us what you are trying to fix, and we will tell you honestly whether
            software is the answer.
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
