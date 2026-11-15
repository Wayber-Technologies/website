import Image from "next/image";
import SiteLayout from "@/components/site/SiteLayout";
import PageHero from "@/components/site/PageHero";
import MarkExploded from "@/components/site/MarkExploded";
import { Clients } from "@/components/site/Work";
import { Closing } from "@/components/site/Contact";
import { LEADERSHIP, MARK_MEANING, VALUES } from "@/constants/pages";
import site from "@/styles/site.module.css";
import styles from "@/styles/pages.module.css";

const PHOTOS = [
  { src: "/home/photo-meeting.jpg", alt: "The team in a planning meeting", position: "center" },
  { src: "/home/photo-whiteboard.jpg", alt: "Mapping a system on the whiteboard", position: "center" },
  { src: "/home/photo-dev.jpg", alt: "An engineer at work", position: "65% center" },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

export default function AboutPage() {
  return (
    <SiteLayout
      title="About · Wayber Technologies"
      description="Wayber Technologies is a software studio in Lagos building web platforms, mobile apps and fintech systems."
    >
      <PageHero
        eyebrow="About"
        title="We are Wayber"
        summary="A software studio in Lagos, building for founders, banks and operators who need technology that keeps working as they grow."
      >
        <div className={styles.photoStrip}>
          {PHOTOS.map((p, i) => (
            <div key={p.src} className={`${styles.stripPhoto} ${site.zoom}`}>
              <Image
                src={p.src}
                alt={p.alt}
                fill
                priority={i === 0}
                sizes="(max-width: 900px) 100vw, 40vw"
                style={{ objectFit: "cover", objectPosition: p.position }}
              />
            </div>
          ))}
        </div>
      </PageHero>

      <section className={site.section} aria-labelledby="name-title">
        <div className={site.container}>
          <div className={site.sectionHead}>
            <h2 id="name-title" className={site.sectionTitle}>
              What’s in the mark
              <br />
              <span className={site.grey}>is how we work.</span>
            </h2>
          </div>
          <div className={`${styles.mark} ${site.gridBg}`}>
            <MarkExploded />
            <div className={styles.markList}>
              {MARK_MEANING.map((m) => (
                <div key={m.word} className={styles.markItem}>
                  <span className={styles.markLetter} aria-hidden="true">
                    {m.letter}
                  </span>
                  <span>
                    <span className={styles.markWord}>{m.word}</span>
                    <span className={styles.markBody}>{m.body}</span>
                  </span>
                </div>
              ))}
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
