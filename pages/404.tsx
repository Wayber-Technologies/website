import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import SiteLayout from "@/components/site/SiteLayout";
import site from "@/styles/site.module.css";
import caseStyles from "@/styles/case.module.css";
import styles from "@/styles/pages.module.css";

export default function NotFound() {
  return (
    <SiteLayout title="Page not found · Wayber Technologies" description="This page doesn’t exist.">
      <section className={styles.notFound}>
        <div className={site.container}>
          <span className={caseStyles.eyebrow}>404</span>
          <h1 className={caseStyles.title}>
            Nothing built here yet<span className={site.dot}>.</span>
          </h1>
          <p className={caseStyles.summary}>The page you’re looking for has moved or never existed.</p>
          <div className={styles.notFoundActions}>
            <Link href="/" className={`${site.pill} ${site.pillBlue}`}>
              Back to home
            </Link>
            <Link href="/work" className={`${site.pill} ${site.pillSoft}`}>
              See our work <ArrowRightIcon className={site.go} />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
