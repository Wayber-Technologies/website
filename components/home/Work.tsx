import Image from "next/image";
import Link from "next/link";
import { CLIENTS, FEATURED_WORK } from "@/constants/home";
import styles from "@/styles/home.module.css";

export default function Work() {
  return (
    <>
      <section id="work" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead} style={{ marginBottom: 48 }}>
            <h2 className={styles.sectionTitle}>
              Built for teams
              <br />
              <span className={styles.grey}>that can’t afford to rebuild.</span>
            </h2>
            <Link href="/presentation" className={styles.textLink}>
              All case studies <span className={styles.go}>→</span>
            </Link>
          </div>

          <div className={styles.workGrid}>
            {FEATURED_WORK.map((item) => (
              <Link key={item.title} href={item.href} className={styles.workCard}>
                <span className={`${styles.workMedia} ${styles.zoom}`} style={{ background: item.image.background }}>
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(max-width: 760px) 100vw, 33vw"
                    style={{
                      objectFit: item.image.fit,
                      padding: item.image.fit === "contain" ? "18%" : 0,
                      // Logos on white backgrounds take on the card colour.
                      mixBlendMode: item.image.fit === "contain" ? "multiply" : undefined,
                    }}
                  />
                </span>
                <span className={styles.workMeta}>
                  <span className={styles.workSector}>{item.sector}</span>
                  <span className={styles.workTitle}>{item.title}</span>
                  <span className={styles.workSummary}>{item.summary}</span>
                </span>
              </Link>
            ))}
          </div>

          <p className={styles.workMore}>
            Also shipped: <Link href="/case/mallamx">Mallam X</Link>, We Sleep and work we can’t name yet.
          </p>
        </div>
      </section>

      <section aria-label="Clients" className={styles.clients}>
        <div className={styles.container}>
          <div className={styles.clientsRow}>
            <span className={styles.clientsLabel}>Trusted by teams at</span>
            {CLIENTS.map((client) => (
              <span key={client} className={styles.clientName}>
                {client}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
