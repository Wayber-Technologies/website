import type { ReactNode } from "react";
import CaretFlow from "./CaretFlow";
import site from "@/styles/site.module.css";

type Props = {
  title: string;
  summary: ReactNode;
  /** Varies the caret field from page to page. */
  seed?: number;
  /** Shown under the hero, in the page container (e.g. the About photos). */
  children?: ReactNode;
};

/**
 * The hero at the top of Services, Work, About and Contact: the title and
 * description on one left edge, and a moving caret field (the home hero's
 * carets) filling the right of the band.
 */
export default function PageHero({ title, summary, seed, children }: Props) {
  return (
    <>
      <section className={`${site.pageHero} ${site.gridBg}`}>
        <CaretFlow seed={seed} />
        <div className={`${site.container} ${site.pageHeroInner}`}>
          <h1 className={site.pageHeroTitle}>
            <span className={site.pageHeroTitleInner}>
              {title}
              <span className={site.dot}>.</span>
            </span>
          </h1>
          <p className={site.pageHeroSummary}>{summary}</p>
        </div>
      </section>
      {children && <div className={`${site.container} ${site.pageHeroAfter}`}>{children}</div>}
    </>
  );
}
