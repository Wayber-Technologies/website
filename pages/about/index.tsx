import { useState } from "react";
import Image from "next/image";
import SiteLayout from "@/components/site/SiteLayout";
import PageHero from "@/components/site/PageHero";
import MarkExploded from "@/components/site/MarkExploded";
import { Clients } from "@/components/site/Work";
import { Closing } from "@/components/site/Contact";
import { ABOUT_PHOTOS, LEADERSHIP, MARK_LAYERS, MARK_MEANING, VALUES } from "@/constants/pages";
import site from "@/styles/site.module.css";
import styles from "@/styles/pages.module.css";

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

/** Three stacked slabs, the "layers" in W + B + layers. */
function LayersGlyph() {
  return (
    <svg viewBox="0 0 48 48" width="1em" height="1em">
      {[0, 1, 2].map((k) => (
        <path
          key={k}
          d="M4 22 L24 12 L44 22 L24 32 Z"
          transform={`translate(0 ${k * 7 - 7})`}
          fill={k === 2 ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

/** The finished mark, small, for the end of the equation. */
function MarkGlyph() {
  return (
    <svg viewBox="0 0 944 693" width="1.3em" height="1em" aria-hidden="true">
      <path
        d="M898.796 173.928L674.342 300.432V112.251L629.271 87.0405L404.817 213.545V25.3641L359.746 0.15332L0.0791016 203.19V494.015L45.6009 519.676L269.604 393.172V580.902L315.126 606.563L539.129 480.059V667.789L584.651 693L943.417 490.863V199.139L898.796 173.928Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function AboutPage() {
  // A layer picked out in the mark (0..2), or none: the mark shown whole.
  const [layer, setLayer] = useState<number | null>(null);
  return (
    <SiteLayout
      title="About · Wayber Technologies"
      description="Wayber Technologies is a remote software studio building web platforms, mobile apps and fintech systems."
    >
      <PageHero
        seed={3}
        title="We are Wayber"
        summary="A remote software studio, building for founders, banks and operators who need technology that keeps working as they grow."
      >
        <ol className={styles.photoBento}>
          {ABOUT_PHOTOS.map((p, i) => (
            <li key={p.src} className={`${styles.bentoPhoto} ${site.zoom}`}>
              <Image
                src={p.src}
                alt={p.alt}
                fill
                priority={i === 0}
                sizes={i === 0 ? "(max-width: 900px) 100vw, 60vw" : "(max-width: 900px) 100vw, 40vw"}
                style={{ objectFit: "cover", objectPosition: p.position }}
              />
              <div className={styles.bentoCaption}>
                <span className={styles.bentoNum}>0{i + 1}</span>
                <h3 className={styles.bentoTitle}>{p.title}</h3>
                <p className={styles.bentoBody}>{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </PageHero>

      <section className={site.section} aria-labelledby="name-title">
        <div className={site.container}>
          <div className={`${styles.markPanel} ${site.gridBg}`}>
            <div className={styles.markStage}>
              {/* Put together; picking a layer pulls it apart to show that slab. */}
              <MarkExploded assembled={layer === null} active={layer} />
            </div>

            <div className={styles.markCopy}>
              <h2 id="name-title" className={styles.markTitle}>
                What’s in the mark <span>is how we work.</span>
              </h2>

              <div
                className={styles.equation}
                aria-label="W for Way, plus B for Better, plus layers of technology, makes Wayber"
              >
                {MARK_MEANING.map((m) => (
                  <span key={m.word} className={styles.eqTerm}>
                    <span className={styles.eqGlyph} aria-hidden="true">
                      {m.glyph === "layers" ? <LayersGlyph /> : m.glyph}
                    </span>
                    <span className={styles.eqWord}>{m.word}</span>
                  </span>
                ))}
                <span className={`${styles.eqTerm} ${styles.eqSum}`}>
                  <span className={styles.eqGlyph} aria-hidden="true">
                    <MarkGlyph />
                  </span>
                  <span className={styles.eqWord}>Wayber</span>
                </span>
              </div>

              <ul className={styles.layerList} onMouseLeave={() => setLayer(null)}>
                {MARK_LAYERS.map((l, k) => (
                  <li key={l.name}>
                    <button
                      type="button"
                      className={styles.layerRow}
                      aria-pressed={layer === k}
                      onMouseEnter={() => setLayer(k)}
                      onFocus={() => setLayer(k)}
                      onBlur={() => setLayer(null)}
                      onClick={() => setLayer(layer === k ? null : k)}
                    >
                      <span className={styles.layerName}>{l.name}</span>
                      <span className={styles.layerBody}>{l.body}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={site.section} aria-labelledby="values-title">
        <div className={site.container}>
          <div className={site.sectionHead}>
            <h2 id="values-title" className={site.sectionTitle}>
              Think big. Build broad.
              <br />
              <span className={site.grey}>Be Wayber</span>
              <span className={site.dot}>.</span>
            </h2>
            <p className={site.sectionLead}>Three things we hold ourselves to on every project.</p>
          </div>
          <div className={styles.trio}>
            {VALUES.map((v) => (
              <div key={v.title} className={styles.trioItem}>
                <span className={styles.trioTitle}>{v.title}</span>
                <p className={styles.trioBody}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={site.section} aria-labelledby="people-title">
        <div className={site.container}>
          <div className={site.sectionHead} style={{ marginBottom: 32 }}>
            <h2 id="people-title" className={site.sectionTitle}>
              The people
              <span className={site.dot}>.</span>
            </h2>
          </div>
          <div className={styles.people}>
            {LEADERSHIP.map((p) => (
              <div key={p.name} className={styles.person}>
                <span className={styles.avatar} aria-hidden="true">
                  {initials(p.name)}
                </span>
                <span>
                  <span className={styles.personName}>{p.name}</span>
                  <span className={styles.personRole}>{p.role}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Clients />
      <Closing />
    </SiteLayout>
  );
}
