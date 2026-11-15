import Image from "next/image";
import Link from "next/link";
import { CONTACT, NAV_LINKS } from "@/constants/home";
import styles from "@/styles/home.module.css";

export default function SiteHeader() {
  return (
    <header>
      <Link href="/case/rftf" className={styles.announce}>
        <span className={styles.tag}>New</span>
        <span>Case study: how we built Run For The Future for ARM Pensions</span>
        <span className={styles.announceCta}>
          Read it <span className={styles.go}>→</span>
        </span>
      </Link>

      <nav aria-label="Main" className={`${styles.container} ${styles.nav}`}>
        <Link href="/" aria-label="Wayber Technologies home">
          <Image src="/logoBlackFull.svg" alt="Wayber" width={145} height={24} priority unoptimized />
        </Link>
        <div className={`${styles.navLinks} ${styles.hideSmall}`}>
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <div className={styles.navRight}>
          <a href={`mailto:${CONTACT.officeEmail}`} className={`${styles.navContact} ${styles.hideSmall}`}>
            Contact
          </a>
          <a href="#start" className={`${styles.pill} ${styles.pillSmall} ${styles.pillInk}`}>
            Start a project
          </a>
        </div>
      </nav>
    </header>
  );
}
