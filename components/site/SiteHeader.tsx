import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/constants/home";
import styles from "@/styles/site.module.css";

export default function SiteHeader() {
  return (
    <header>
      <Link href="/case/rftf" className={styles.announce}>
        <span>Case study: Run For The Future, the run-tracking app we built for ARM Pensions</span>
        <span className={styles.announceCta}>
          Read it <ArrowRightIcon className={styles.go} />
        </span>
      </Link>

      <nav aria-label="Main" className={`${styles.container} ${styles.nav}`}>
        <Link href="/" aria-label="Wayber Technologies home">
          <Image src="/logoBlackFull.svg" alt="Wayber" width={145} height={24} priority unoptimized />
        </Link>
        <div className={`${styles.navLinks} ${styles.hideSmall}`}>
          {NAV_LINKS.map((link) =>
            link.href.startsWith("http") ? (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            ) : (
              <Link key={link.label} href={link.href}>
                {link.label}
              </Link>
            )
          )}
        </div>
        <div className={styles.navRight}>
          <Link href="/contact" className={`${styles.navContact} ${styles.hideSmall}`}>
            Contact
          </Link>
          <Link href="/contact" className={`${styles.pill} ${styles.pillSmall} ${styles.pillInk}`}>
            Start a project
          </Link>
        </div>
      </nav>
    </header>
  );
}
