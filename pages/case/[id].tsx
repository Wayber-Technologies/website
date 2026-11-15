import Link from "next/link";
import type { GetStaticPaths, GetStaticProps } from "next";
import SiteLayout from "@/components/site/SiteLayout";
import CaseFrame from "@/components/site/case/CaseFrame";
import { Closing } from "@/components/site/Contact";
import { CASES, getCase, getNextCase } from "@/constants/cases";
import site from "@/styles/site.module.css";
import styles from "@/styles/case.module.css";

type Props = { slug: string };

export const getStaticPaths: GetStaticPaths = () => ({
  paths: CASES.map((c) => ({ params: { id: c.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = ({ params }) => {
  const slug = String(params?.id ?? "");
  return getCase(slug) ? { props: { slug } } : { notFound: true };
};

export default function CaseStudyPage({ slug }: Props) {
  const item = getCase(slug)!;
  const next = getNextCase(slug);

  const story = [
    { label: "The brief", text: item.challenge },
    { label: "What we built", text: item.approach },
    { label: "The outcome", text: item.outcome },
  ];

  return (
    <SiteLayout title={`${item.title} · Wayber Technologies`} description={item.summary}>
      <section className={styles.hero}>
        <div className={site.container}>
          <nav aria-label="Breadcrumb" className={styles.crumbs}>
            <Link href="/work">Work</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{item.title}</span>
          </nav>
          <span className={styles.eyebrow}>{item.sector}</span>
          <h1 className={styles.title}>
            {item.title}
            <span className={site.dot}>.</span>
          </h1>
          <p className={styles.summary}>{item.summary}</p>

          <dl className={styles.meta}>
            {item.client && (
              <div>
                <dt>Client</dt>
                <dd>{item.client}</dd>
              </div>
            )}
            <div>
              <dt>Sector</dt>
              <dd>{item.sector}</dd>
            </div>
            <div>
              <dt>Platform</dt>
              <dd>{item.platform}</dd>
            </div>
            <div className={styles.metaWide}>
              <dt>What we did</dt>
              <dd className={styles.services}>
                {item.services.map((s) => (
                  <span key={s} className={styles.service}>
                    {s}
                  </span>
                ))}
              </dd>
            </div>
          </dl>

          <div className={styles.cover}>
            <CaseFrame image={item.cover} shape="wide" sizes="(max-width: 1320px) 100vw, 1272px" priority />
          </div>
        </div>
      </section>

      <section className={styles.story} aria-label="The story">
        <div className={site.container}>
          <div className={styles.storyRow}>
            <span className={styles.storyLabel}>
              <span className={styles.storyNumber}>01</span>Overview
            </span>
            <p className={styles.storyLead}>{item.overview}</p>
          </div>
          {story.map((row, i) => (
            <div key={row.label} className={styles.storyRow}>
              <span className={styles.storyLabel}>
                <span className={styles.storyNumber}>{String(i + 2).padStart(2, "0")}</span>
                {row.label}
              </span>
              <p className={styles.storyText}>{row.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-label={`${item.title} screens`}>
        <div className={`${site.container} ${styles.gallery}`}>
          {item.gallery.map((img) => (
            <div key={img.alt} className={img.span === "full" ? styles.galleryFull : undefined}>
              <CaseFrame
                image={img}
                shape={img.span}
                sizes={img.span === "full" ? "(max-width: 1320px) 100vw, 1272px" : "(max-width: 760px) 100vw, 640px"}
              />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.next}>
        <div className={site.container}>
          <Link href={`/case/${next.slug}`} className={styles.nextCard}>
            <span className={styles.nextText}>
              <span className={styles.nextKicker}>Next case</span>
              <span className={styles.nextTitle}>
                {next.title} <span className={site.go}>→</span>
              </span>
              <span className={styles.nextSummary}>{next.summary}</span>
            </span>
            <span className={styles.nextMedia}>
              <CaseFrame image={next.card} shape="card" sizes="420px" blend />
            </span>
          </Link>
        </div>
      </section>

      <Closing />
    </SiteLayout>
  );
}
