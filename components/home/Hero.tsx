import CubeField from "./CubeField";
import styles from "@/styles/home.module.css";

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
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
      <CubeField />
    </section>
  );
}
