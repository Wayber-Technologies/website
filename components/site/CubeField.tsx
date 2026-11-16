import { useEffect, useRef } from "react";
import { createCubeField } from "@/lib/cubeField";
import styles from "@/styles/site.module.css";

/**
 * The animated Wayber mark. The box fills its positioned parent and marks where
 * the mark sits; the dots are drawn on a canvas fixed over the window, so they
 * can fly to the stage further down the page (see lib/cubeField.ts).
 */
export default function CubeField() {
  const markRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !markRef.current) return;
    const field = createCubeField(canvasRef.current, markRef.current);
    return () => field.destroy();
  }, []);

  return (
    <>
      <div ref={markRef} className={styles.fieldCanvas} role="img" aria-label="The Wayber mark, three stacked slabs drawn from small dots" />
      <canvas ref={canvasRef} className={styles.fieldLayer} aria-hidden="true" />
    </>
  );
}
