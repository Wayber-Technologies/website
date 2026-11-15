import { useEffect, useRef } from "react";
import { createCubeField, type CubeField as Field } from "@/lib/cubeField";
import styles from "@/styles/home.module.css";

export default function CubeField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fieldRef = useRef<Field | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const field = createCubeField(canvasRef.current);
    fieldRef.current = field;
    return () => {
      field.destroy();
      fieldRef.current = null;
    };
  }, []);

  return (
    <div className={`${styles.container} ${styles.field}`}>
      <canvas
        ref={canvasRef}
        className={styles.fieldCanvas}
        role="img"
        aria-label="The Wayber mark, three stacked slabs, drawn from a field of small squares"
        onPointerMove={(e) => fieldRef.current?.pointer(e.clientX, e.clientY)}
        onPointerLeave={() => fieldRef.current?.leave()}
      />
      <span className={`${styles.fieldNote} ${styles.fieldNoteLeft}`}>W + B + layers of technology</span>
      <span className={`${styles.fieldNote} ${styles.fieldNoteRight} ${styles.hideSmall}`}>Move your cursor through it</span>
    </div>
  );
}
