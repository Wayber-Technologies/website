import Image from "next/image";
import Link from "next/link";
import { CLIENTS, FEATURED_WORK } from "@/constants/home";
import styles from "@/styles/site.module.css";

export default function Work() {
  return (
    <>
      <section id="work" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead} style={{ marginBottom: 48 }}>
            <h2 className={styles.sectionTitle}>Selected work</h2>
            <Link href="/work" className={styles.textLink}>
              All case studies <span className={styles.go}>→</span>
            </Link>
          </div>

          <div className={styles.workGrid}>
            {FEATURED_WORK.map((item) => (
              <Link key={item.title} href={item.href} className={styles.workCard}>
                <span className={`${styles.workMedia} ${styles.zoom}`} style={{ background: item.image.background }}>
                  <span className={styles.workArrow} aria-hidden="true">
                    →
                  </span>
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
            Also shipped: <Link href="/case/mallamx">Mallam X</Link> and <Link href="/case/wesleep">WeSleep</Link>.
          </p>
        </div>
      </section>

      <Clients />
    </>
  );
}

export function Clients() {
  return (
    <>
      <section aria-label="Clients" className={styles.clients}>
        <div className={styles.container}>
          <div className={styles.clientsRow}>
            <span className={styles.clientsLabel}>Clients include</span>
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
