import { useEffect, useRef } from "react";
import { createCaretFlow } from "@/lib/caretFlow";
import styles from "@/styles/site.module.css";

/** The moving caret field behind a page hero (see lib/caretFlow.ts). */
export default function CaretFlow({ seed = 1 }: { seed?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const flow = createCaretFlow(ref.current, seed);
    return () => flow.destroy();
  }, [seed]);
  return <canvas ref={ref} className={styles.pageHeroCanvas} aria-hidden="true" />;
}
