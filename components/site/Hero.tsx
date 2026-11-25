import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import type { CSSProperties } from "react";
import CubeField from "./CubeField";
import styles from "@/styles/site.module.css";
import PillLabel from "@/components/site/PillLabel";

export default function Hero() {
  return (
    <section id="top" className={`${styles.hero} ${styles.gridBg}`}>
      {/* Desktop: the canvas fills the hero and draws the
          mark in the right column. Phones: it sits below the copy. */}
      <CubeField />
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div className={styles.heroInner}>
          {/* The tagline, one line per phrase. Each full stop is Wayber Blue, as in
              the brand guide; the lines rise in one after another on load. */}
          <h1 className={styles.heroTitle}>
            {["Think big", "Build broad", "Be Wayber"].map((line, i) => (
              <span key={line} className={styles.heroLine}>
                <span className={styles.heroLineInner} style={{ "--i": i } as CSSProperties}>
                  {line}
                  <span className={styles.dot}>.</span>
                </span>
              </span>
            ))}
          </h1>
          <p className={styles.heroLead}>
            We design, build and look after web platforms, mobile apps and the APIs behind them.
          </p>
          <div className={styles.actions}>
            <Link href="/contact" className={`${styles.pill} ${styles.pillBlue}`}>
              <PillLabel>Start a project</PillLabel> <ArrowRightIcon className={styles.go} />
            </Link>
            <a href="#work" className={`${styles.pill} ${styles.pillSoft}`}>
              <PillLabel>See the work</PillLabel>
            </a>
          </div>
        </div>
      </div>
      <span className={`${styles.fieldNote} ${styles.fieldNoteRight} ${styles.hideSmall}`}>Move your cursor through it</span>
    </section>
  );
}
