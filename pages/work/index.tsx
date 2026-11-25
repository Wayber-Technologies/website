import SiteLayout from "@/components/site/SiteLayout";
import PageHero from "@/components/site/PageHero";
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
      <PageHero
        seed={2}
        title="Work"
        summary="Products we’ve designed, built and kept running, for teams that can’t afford to rebuild."
      />

      <section aria-label="Case studies">
        <div className={site.container}>
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
