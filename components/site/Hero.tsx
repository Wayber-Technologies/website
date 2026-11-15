import CubeField from "./CubeField";
import styles from "@/styles/site.module.css";

export default function Hero() {
  return (
    <section id="top" className={`${styles.hero} ${styles.gridBg}`}>
      {/* Desktop: the canvas fills the hero and draws the
          mark in the right column. Phones: it sits below the copy. */}
      <CubeField />
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>Software studio · Lagos, Nigeria</span>
          <h1 className={styles.heroTitle}>
            Think big.
            <br />
            Build broad.
            <br />
            <span className={styles.grey}>Be Wayber</span>
            <span className={styles.dot}>.</span>
          </h1>
          <p className={styles.heroLead}>
            We design, build and look after web platforms, mobile apps and the systems underneath them.
          </p>
          <div className={styles.actions}>
            <a href="#start" className={`${styles.pill} ${styles.pillBlue}`}>
              Start a project
            </a>
            <a href="#work" className={`${styles.pill} ${styles.pillSoft}`}>
              See the work <span className={styles.go}>→</span>
            </a>
          </div>
        </div>
      </div>
      <span className={`${styles.fieldNote} ${styles.fieldNoteRight} ${styles.hideSmall}`}>Move your cursor through it</span>
    </section>
  );
}
