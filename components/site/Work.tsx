import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { ArrowRightIcon as CardArrowIcon } from "@heroicons/react/24/outline";
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
              All case studies <ArrowRightIcon className={styles.go} />
            </Link>
          </div>

          <div className={styles.workGrid}>
            {FEATURED_WORK.map((item) => (
              <Link key={item.title} href={item.href} className={styles.workCard}>
                <span className={`${styles.workMedia} ${styles.zoom}`} style={{ background: item.image.background }}>
                  <span className={styles.workArrow} aria-hidden="true">
                    <CardArrowIcon className={styles.workArrowIcon} />
                  </span>
                  {/* The artwork sits at the top and fades into the card colour below. */}
                  <span className={styles.workArt}>
                    <Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 760px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                  </span>
                  <span className={styles.workSector}>{item.sector}</span>
                </span>
                <span className={styles.workMeta}>
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

    </>
  );
}

/** `tight`: little space above, for when the strip sits right under the hero. */
export function Clients({ tight = false }: { tight?: boolean }) {
  return (
    <>
      <section aria-label="Clients" className={`${styles.clients} ${tight ? styles.clientsTight : ""}`}>
        <div className={styles.container}>
          <div className={styles.clientsRow}>
            <span className={styles.clientsLabel}>Clients include</span>
            <div className={styles.marquee}>
              <div className={styles.marqueeTrack}>
                {[0, 1].map((copy) => (
                  <div key={copy} className={styles.marqueeSet} aria-hidden={copy === 1 || undefined}>
                    {CLIENTS.map((client) => (
                      <Image
                        key={client.name}
                        src={client.logo}
                        alt={copy === 0 ? client.name : ""}
                        width={client.width}
                        height={client.height}
                        className={styles.clientLogo}
                        style={{ height: client.display, width: "auto" }}
                        unoptimized={client.logo.endsWith(".svg")}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
