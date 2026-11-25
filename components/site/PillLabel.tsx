import styles from "@/styles/site.module.css";

/**
 * A button's text, set up for the hover: the label rolls up and out while an
 * identical copy rolls in from below. The copy is hidden from screen readers.
 */
export default function PillLabel({ children }: { children: string }) {
  return (
    <span className={styles.pillText}>
      <span className={styles.pillRoll}>
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    </span>
  );
}
