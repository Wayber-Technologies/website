import CubeField from "./CubeField";
import styles from "@/styles/site.module.css";

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      {/* The mark sits behind the copy as a full-bleed background. */}
      <CubeField />
      <div className={`${styles.narrow} ${styles.heroInner}`}>
        <span className={styles.eyebrow}>Software studio · Lagos, Nigeria</span>
        <h1 className={styles.heroTitle}>
          <span className={styles.nowrap}>Think big.</span> <span className={styles.nowrap}>Build broad.</span>
          <br />
          <span className={styles.nowrap}>
            <span className={styles.grey}>Be Wayber</span>
            <span className={styles.dot}>.</span>
          </span>
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
      <span className={`${styles.fieldNote} ${styles.fieldNoteLeft}`}>W + B + layers of technology</span>
      <span className={`${styles.fieldNote} ${styles.fieldNoteRight} ${styles.hideSmall}`}>Move your cursor through it</span>
    </section>
  );
}
