import Image from "next/image";
import { STUDIO_PHOTOS } from "@/constants/home";
import styles from "@/styles/home.module.css";

export default function Studio() {
  return (
    <section id="studio" className={styles.statement}>
      <div className={styles.narrow}>
        <p className={styles.statementText}>
          Wayber Technologies is a software studio in Lagos.{" "}
          <span className={styles.grey}>
            We work with founders, banks and operators who need software that works on launch day and still holds up
            when they have grown tenfold.
          </span>
        </p>
      </div>
      <div className={`${styles.container} ${styles.photos}`}>
        {STUDIO_PHOTOS.map((photo) => (
          <div key={photo.src} className={`${styles.photo} ${styles.zoom}`}>
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 760px) 100vw, 33vw"
              style={{ objectFit: "cover", objectPosition: photo.position }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
