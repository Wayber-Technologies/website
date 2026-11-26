import { useEffect, useRef } from "react";
import { attachPillDots } from "@/lib/pillDots";
import styles from "@/styles/site.module.css";

/**
 * A button's text, set up for the hover: Wayber carets rush in and pack into
 * the hover fill (see lib/pillDots.ts), and the label rolls up and out while
 * an identical copy rolls in from below. The copy is hidden from screen readers.
 */
export default function PillLabel({ children }: { children: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    return attachPillDots(canvasRef.current);
  }, []);
  return (
    <>
      <canvas ref={canvasRef} className={styles.pillDots} aria-hidden="true" />
      <span className={styles.pillText}>
        <span className={styles.pillRoll}>
          <span>{children}</span>
          <span aria-hidden="true">{children}</span>
        </span>
      </span>
    </>
  );
}
