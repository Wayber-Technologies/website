import { useEffect, useRef } from "react";
import { createCubeField } from "@/lib/cubeField";
import styles from "@/styles/site.module.css";

/** The animated Wayber mark. Fills its positioned parent and tracks the pointer over it. */
export default function CubeField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const field = createCubeField(canvasRef.current);
    return () => field.destroy();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.fieldCanvas}
      role="img"
      aria-label="The Wayber mark, three stacked slabs drawn from small squares"
    />
  );
}
