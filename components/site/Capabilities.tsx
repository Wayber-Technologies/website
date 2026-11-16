import Image from "next/image";
import Link from "next/link";
import { CAPABILITIES, OTHER_SERVICES } from "@/constants/home";
import styles from "@/styles/site.module.css";

export default function Capabilities() {
  return (
    <section id="build" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>What we build</h2>
          <p className={styles.sectionLead}>
            Designers and engineers on one team. Laravel, Python and Vue on the web; Flutter, Swift and Kotlin on
            mobile.
          </p>
        </div>

        <div className={styles.rows}>
          {CAPABILITIES.map((item) => {
            const rowClass = [
              styles.row,
              item.tone === "dark" ? styles.rowDark : "",
              item.mediaFirst ? styles.rowMediaFirst : "",
            ].join(" ");

            const text = (
              <div className={styles.rowText}>
                <div>
                  <h3 className={styles.rowTitle}>{item.title}</h3>
                  <p className={styles.rowBody}>{item.body}</p>
                </div>
                <Link href={item.href} className={styles.textLink}>
                  {item.linkLabel} <span className={styles.go}>→</span>
                </Link>
              </div>
            );

            const media = (
              <div className={`${styles.rowMedia} ${styles.zoom}`} style={{ background: item.image.background }}>
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(max-width: 760px) 100vw, 60vw"
                  style={{
                    objectFit: item.image.fit,
                    objectPosition: item.image.position ?? "center",
                    padding: item.image.fit === "contain" ? 32 : 0,
                  }}
                />
              </div>
            );

            return (
              <div key={item.title} className={rowClass}>
                {item.mediaFirst ? (
                  <>
                    {media}
                    {text}
                  </>
                ) : (
                  <>
                    {text}
                    {media}
                  </>
                )}
              </div>
            );
          })}
        </div>

        <div className={styles.chips}>
          <span className={styles.chipsLabel}>We also do</span>
          {OTHER_SERVICES.map((service) => (
            <span key={service} className={styles.chip}>
              {service}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
