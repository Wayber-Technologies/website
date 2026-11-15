import Image from "next/image";
import Link from "next/link";
import { CONTACT, SOCIAL } from "@/constants/home";
import styles from "@/styles/site.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <Image src="/logoWhiteFull.svg" alt="Wayber" width={170} height={28} unoptimized />
            <span>{CONTACT.address}</span>
          </div>
          <nav aria-label="Footer: studio" className={styles.footerCol}>
            <span className={styles.footerHeading}>Studio</span>
            <Link href="/#build">What we build</Link>
            <Link href="/work">Work</Link>
            <Link href="/#studio">About</Link>
          </nav>
          <nav aria-label="Footer: contact" className={`${styles.footerCol} ${styles.footerColWide}`}>
            <span className={styles.footerHeading}>Contact</span>
            <a href={`mailto:${CONTACT.officeEmail}`}>{CONTACT.officeEmail}</a>
            <a href={`mailto:${CONTACT.technologyEmail}`}>{CONTACT.technologyEmail}</a>
            <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
          </nav>
          <nav aria-label="Footer: elsewhere" className={styles.footerCol}>
            <span className={styles.footerHeading}>Elsewhere</span>
            {SOCIAL.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </nav>
        </div>
        <div className={styles.footerBottom}>
          <span className={styles.footerTagline}>
            Think big. Build broad. Be Wayber<span className={styles.dot}>.</span>
          </span>
          <span className={styles.copyright}>© {new Date().getFullYear()} Wayber Technologies</span>
        </div>
      </div>
    </footer>
  );
}
