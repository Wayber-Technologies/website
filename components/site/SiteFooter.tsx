import { ArrowUpIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { CONTACT, SOCIAL } from "@/constants/home";
import styles from "@/styles/site.module.css";

const STUDIO_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function SiteFooter() {
  return (
    <footer className={`${styles.footer} ${styles.gridBg}`}>
      <div className={styles.container}>
        <div className={styles.footerHead}>
          <div className={styles.footerBrand}>
            <Image src="/logoWhiteFull.svg" alt="Wayber" width={150} height={25} unoptimized />
            <p>We build the product, then stay to keep it running.</p>
          </div>
          <button
            type="button"
            className={styles.footerToTop}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to top <ArrowUpIcon aria-hidden />
          </button>
        </div>

        <div className={styles.footerGrid}>
          <nav aria-label="Footer: studio" className={styles.footerCell}>
            <span className={styles.footerHeading}>Studio</span>
            {STUDIO_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={styles.footerLink}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className={styles.footerCell}>
            <span className={styles.footerHeading}>Talk to us</span>
            <a href={`mailto:${CONTACT.officeEmail}`} className={styles.footerLink}>
              {CONTACT.officeEmail}
            </a>
            <a href={`mailto:${CONTACT.technologyEmail}`} className={styles.footerLink}>
              {CONTACT.technologyEmail}
            </a>
            <a href={CONTACT.phoneHref} className={styles.footerLink}>
              {CONTACT.phoneDisplay}
            </a>
          </div>
          <nav aria-label="Footer: elsewhere" className={styles.footerCell}>
            <span className={styles.footerHeading}>Elsewhere</span>
            {SOCIAL.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                {s.label}
              </a>
            ))}
          </nav>
          <div className={styles.footerCell}>
            <span className={styles.footerHeading}>How we work</span>
            <p className={styles.footerNote}>A remote team. We work with clients wherever they are.</p>
          </div>
        </div>

        <p className={styles.footerWord} aria-hidden="true">
          Be Wayber<span className={styles.dot}>.</span>
        </p>

        <div className={styles.footerBottom}>
          <span>© {new Date().getFullYear()} Wayber Technologies</span>
          <span>Think big. Build broad. Be Wayber.</span>
        </div>
      </div>
    </footer>
  );
}
