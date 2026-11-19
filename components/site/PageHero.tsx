import type { ReactNode } from "react";
import site from "@/styles/site.module.css";

type Props = {
  eyebrow: string;
  title: string;
  summary: ReactNode;
  /** Shown under the hero band, in the page container (e.g. the About photos). */
  children?: ReactNode;
};

/**
 * The small hero at the top of Services, Work, About and Contact: a band with
 * the home hero's faint grid behind it, the title on the left and the
 * description on the right.
 */
export default function PageHero({ eyebrow, title, summary, children }: Props) {
  return (
    <>
      <section className={`${site.pageHero} ${site.gridBg}`}>
        <div className={`${site.container} ${site.pageHeroInner}`}>
          <div>
            <span className={site.pageHeroEyebrow}>{eyebrow}</span>
            <h1 className={site.pageHeroTitle}>
              {title}
              <span className={site.dot}>.</span>
            </h1>
          </div>
          <p className={site.pageHeroSummary}>{summary}</p>
        </div>
      </section>
      {children && <div className={`${site.container} ${site.pageHeroAfter}`}>{children}</div>}
    </>
  );
}
