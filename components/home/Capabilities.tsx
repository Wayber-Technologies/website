import Image from "next/image";
import { CAPABILITIES, OTHER_SERVICES } from "@/constants/home";
import styles from "@/styles/home.module.css";

export default function Capabilities() {
  return (
    <section id="build" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>
            What we build
            <br />
            <span className={styles.grey}>and keep running.</span>
          </h2>
          <p className={styles.sectionLead}>
            Strategy, design and engineering in one team, so nothing gets lost between the person who scoped it and the
            person who ships it.
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
                <span className={styles.rowNumber}>{item.number}</span>
                <div>
                  <h3 className={styles.rowTitle}>{item.title}</h3>
                  <p className={styles.rowBody}>{item.body}</p>
                </div>
                <a href="#work" className={styles.textLink}>
                  {item.linkLabel} <span className={styles.go}>→</span>
                </a>
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
          <span className={styles.chipsLabel}>Also in the studio:</span>
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
