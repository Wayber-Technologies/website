import { ArrowUpIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { CONTACT, SOCIAL } from "@/constants/home";
import styles from "@/styles/site.module.css";

const PAGES = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const TICKER = ["Think big", "Build broad", "Be Wayber"];

/* Light and editorial. The pages set large in one line, a row of small info
   columns, then the tagline running slowly across in outline type. */
export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerHead}>
          <Image src="/logoBlackFull.svg" alt="Wayber" width={132} height={22} unoptimized />
          <button
            type="button"
            className={styles.footerToTop}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to top <ArrowUpIcon aria-hidden />
          </button>
        </div>

        <nav aria-label="Footer: pages" className={styles.footerPages}>
          {PAGES.map((l) => (
            <Link key={l.href} href={l.href} className={styles.footerPage}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className={styles.footerInfo}>
          <div className={styles.footerCell}>
            <span className={styles.footerHeading}>New projects</span>
            <a href={`mailto:${CONTACT.officeEmail}`} className={styles.footerLink}>
              {CONTACT.officeEmail}
            </a>
            <a href={CONTACT.phoneHref} className={styles.footerLink}>
              {CONTACT.phoneDisplay}
            </a>
          </div>
          <div className={styles.footerCell}>
            <span className={styles.footerHeading}>Support</span>
            <a href={`mailto:${CONTACT.technologyEmail}`} className={styles.footerLink}>
              {CONTACT.technologyEmail}
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
            <p className={styles.footerNote}>
              <span className={styles.footerLive} aria-hidden />
              Remote, with clients wherever they are.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.footerTicker} aria-hidden="true">
        {/* Two identical halves, so the loop is seamless. */}
        <div className={styles.footerTrack}>
          {[0, 1].map((half) => (
            <span key={half}>
              {[...TICKER, ...TICKER].map((t, i) => (
                <span key={i} className={styles.footerTick}>
                  {t}
                  <span className={styles.dot}>.</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.footerBottom}>
          <span>© {new Date().getFullYear()} Wayber Technologies</span>
          <span>Think big. Build broad. Be Wayber.</span>
        </div>
      </div>
    </footer>
  );
}
