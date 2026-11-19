import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { MEDIUM_PROFILE, type Article } from "@/lib/medium";
import { PROCESS_STEPS } from "@/constants/home";
import styles from "@/styles/site.module.css";

// Three or more articles scroll as a carousel; one or two sit as featured cards.
const CAROUSEL_FROM = 3;

// Fixed locale and time zone, so the server and browser print the same date.
const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));

function ArticleCard({ article, layout }: { article: Article; layout: "wide" | "column" | "slide" }) {
  const className = {
    wide: `${styles.article} ${styles.articleWide}`,
    column: styles.article,
    slide: `${styles.article} ${styles.articleSlide}`,
  }[layout];
  return (
    <a href={article.url} target="_blank" rel="noopener noreferrer" className={className}>
      <span className={`${styles.articleMedia} ${styles.zoom}`}>
        {article.image && (
          <Image
            src={article.image}
            alt=""
            fill
            sizes={layout === "wide" ? "(max-width: 760px) 100vw, 50vw" : "(max-width: 760px) 85vw, 420px"}
            style={{ objectFit: "cover" }}
          />
        )}
      </span>
      <span className={styles.articleBody}>
        <span className={styles.articleDate}>{formatDate(article.date)}</span>
        <span className={styles.articleTitle}>{article.title}</span>
        <span className={styles.articleExcerpt}>{article.excerpt}</span>
        <span className={styles.textLink}>
          Read on Medium <ArrowRightIcon className={styles.go} />
        </span>
      </span>
    </a>
  );
}

/**
 * "From idea to launch": how a project runs, as three photo cards with each
 * step's text laid over its photo. The cards rise in one after another the
 * first time they scroll into view.
 */
export default function Studio() {
  const list = useRef<HTMLOListElement>(null);
  // "idle": shown as-is (no JS yet, already on screen, or reduced motion).
  // "waiting": hidden below the fold until it scrolls in. "shown": risen.
  const [reveal, setReveal] = useState<"idle" | "waiting" | "shown">("idle");

  useEffect(() => {
    const el = list.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    // Already in view on load: leave it be, so it never blinks out.
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setReveal("waiting");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setReveal("shown");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const revealClass = { idle: "", waiting: styles.stepsWaiting, shown: styles.stepsShown }[reveal];

  return (
    <section id="studio" className={styles.statement}>
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>
            From idea to launch<span className={styles.dot}>.</span>
          </h2>
          <p className={styles.sectionLead}>
            Wayber is a software studio in Lagos. We build the product, then stay to keep it running.
          </p>
        </div>
        <ol ref={list} className={`${styles.steps} ${revealClass}`}>
          {PROCESS_STEPS.map((step, i) => (
            <li
              key={step.title}
              className={`${styles.stepCard} ${styles.zoom}`}
              style={{ "--i": i } as CSSProperties}
            >
              <Image
                src={step.image}
                alt={step.alt}
                fill
                sizes="(max-width: 899px) 100vw, 440px"
                style={{ objectFit: "cover", objectPosition: step.position ?? "center" }}
              />
              <h3 className={styles.stepTitle}>
                {step.title}
                <span className={styles.stepStop} aria-hidden="true" />
              </h3>
              <p className={styles.stepBody}>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Latest articles from the Medium journal. Hidden when there are none (or Medium can't be reached). */
export function Journal({ articles }: { articles: Article[] }) {
  const track = useRef<HTMLDivElement>(null);
  const carousel = articles.length >= CAROUSEL_FROM;

  // Move by about one card: the first card's width plus the gap.
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    el.scrollBy({ left: dir * (first.offsetWidth + 16), behavior: "smooth" });
  };

  if (!articles.length) return null;

  return (
    <section id="journal" className={styles.section}>
      <div className={`${styles.container} ${styles.sectionHead}`}>
        <h2 className={styles.sectionTitle}>Journal</h2>
        <div className={styles.journalActions}>
          <a href={MEDIUM_PROFILE} target="_blank" rel="noopener noreferrer" className={styles.textLink}>
            All articles <ArrowRightIcon className={styles.go} />
          </a>
          {carousel && (
            <div className={styles.carouselNav}>
              <button
                type="button"
                className={styles.carouselBtn}
                onClick={() => scroll(-1)}
                aria-label="Previous articles"
              >
                <ArrowLeftIcon />
              </button>
              <button type="button" className={styles.carouselBtn} onClick={() => scroll(1)} aria-label="Next articles">
                <ArrowRightIcon />
              </button>
            </div>
          )}
        </div>
      </div>

      {carousel ? (
        <div ref={track} className={styles.carousel} role="region" aria-label="Articles from the journal" tabIndex={0}>
          {articles.map((a) => (
            <ArticleCard key={a.url} article={a} layout="slide" />
          ))}
        </div>
      ) : (
        <div className={`${styles.container} ${styles.articleGrid}`}>
          {articles.map((a) => (
            <ArticleCard key={a.url} article={a} layout={articles.length === 1 ? "wide" : "column"} />
          ))}
        </div>
      )}
    </section>
  );
}
