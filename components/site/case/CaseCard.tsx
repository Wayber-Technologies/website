import Link from "next/link";
import type { CaseStudy } from "@/constants/cases";
import CaseFrame from "./CaseFrame";
import styles from "@/styles/case.module.css";

export default function CaseCard({ item }: { item: CaseStudy }) {
  return (
    <Link href={`/case/${item.slug}`} className={styles.card}>
      <CaseFrame
        image={item.card}
        shape="card"
        sizes="(max-width: 760px) 100vw, 50vw"
        blend
        zoom
        label={item.client ? `${item.sector} · ${item.client}` : item.sector}
      />
      <span className={styles.cardMeta}>
        <span className={styles.cardTop}>
          <span className={styles.cardTitle}>{item.title}</span>
          <span className={styles.cardPlatform}>{item.platform}</span>
        </span>
        <span className={styles.cardSummary}>{item.summary}</span>
      </span>
    </Link>
  );
}
