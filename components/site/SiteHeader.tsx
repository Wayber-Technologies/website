import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/constants/home";
import styles from "@/styles/site.module.css";

export default function SiteHeader() {
  // Once the page has scrolled, the bar gets a backdrop and a hairline below it.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <>
      <Link href="/case/rftf" className={styles.announce}>
        <span>
          Case study: Run For The Future, the run-tracking app we built for ARM
          Pensions
        </span>
        <span className={styles.announceCta}>
          Read it <ArrowRightIcon className={styles.go} />
        </span>
      </Link>

      {/* The announcement scrolls away; the header sticks to the top. */}
      <header
        className={`${styles.siteHeader} ${scrolled ? styles.siteHeaderScrolled : ""}`}
      >
        <nav aria-label="Main" className={`${styles.container} ${styles.nav}`}>
          <Link href="/" aria-label="Wayber Technologies home">
            <Image
              src="/logoBlackFull.svg"
              alt="Wayber"
              width={145}
              height={24}
              priority
              unoptimized
            />
          </Link>
          <div className={`${styles.navLinks} ${styles.hideSmall}`}>
            {NAV_LINKS.map((link) =>
              link.href.startsWith("http") ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ) : (
                <Link key={link.label} href={link.href}>
                  {link.label}
                </Link>
              ),
            )}
          </div>
          <div className={styles.navRight}>
            <Link
              href="/contact"
              className={`${styles.navContact} ${styles.hideSmall}`}
            >
              Contact
            </Link>
            <Link
              href="/contact"
              className={`${styles.pill} ${styles.pillSmall} ${styles.pillInk}`}
            >
              Start a project
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}
