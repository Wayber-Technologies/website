import SiteLayout from "@/components/site/SiteLayout";
import CaseCard from "@/components/site/case/CaseCard";
import { Closing } from "@/components/site/Contact";
import { CASES } from "@/constants/cases";
import site from "@/styles/site.module.css";
import styles from "@/styles/case.module.css";

export default function WorkPage() {
  return (
    <SiteLayout
      title="Work · Wayber Technologies"
      description="Case studies from Wayber Technologies: workflow tools, fintech wallets, investment platforms and mobile apps."
    >
      <section className={styles.workHero}>
        <div className={site.container}>
          <span className={styles.eyebrow}>Case studies</span>
          <h1 className={styles.title}>
            Work<span className={site.dot}>.</span>
          </h1>
          <p className={styles.summary}>Products we’ve designed, built and kept running, for teams that can’t afford to rebuild.</p>

          <div className={styles.workGrid}>
            {CASES.map((item) => (
              <CaseCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      <Closing />
    </SiteLayout>
  );
}
