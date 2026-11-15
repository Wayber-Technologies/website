import type { ReactNode } from "react";
import site from "@/styles/site.module.css";
import styles from "@/styles/case.module.css";

type Props = {
  eyebrow: string;
  title: string;
  summary: ReactNode;
  children?: ReactNode;
};

export default function PageHero({ eyebrow, title, summary, children }: Props) {
  return (
    <section className={styles.workHero}>
      <div className={site.container}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h1 className={styles.title}>
          {title}
          <span className={site.dot}>.</span>
        </h1>
        <p className={styles.summary}>{summary}</p>
        {children}
      </div>
    </section>
  );
}
