import Image from "next/image";
import type { CaseImage } from "@/constants/cases";
import site from "@/styles/site.module.css";
import styles from "@/styles/case.module.css";

type Props = {
  image: CaseImage;
  shape: "wide" | "full" | "half" | "card";
  sizes: string;
  priority?: boolean;
  /** Blend white logo backgrounds into the frame colour. */
  blend?: boolean;
  zoom?: boolean;
};

const SHAPES = {
  wide: styles.frameWide,
  full: styles.frameFull,
  half: styles.frameHalf,
  card: styles.frameCard,
};

export default function CaseFrame({ image, shape, sizes, priority, blend, zoom }: Props) {
  const contain = image.fit === "contain";
  return (
    <span
      className={`${styles.frame} ${SHAPES[shape]} ${zoom ? site.zoom : ""}`}
      style={{ background: image.background, display: "block" }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        style={{
          objectFit: image.fit,
          padding: contain ? (shape === "card" ? "16%" : "6%") : 0,
          mixBlendMode: blend && contain ? "multiply" : undefined,
        }}
      />
    </span>
  );
}
