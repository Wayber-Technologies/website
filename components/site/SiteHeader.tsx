import { ArrowRightIcon, ArrowUpRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CONTACT, NAV_LINKS } from "@/constants/home";
import styles from "@/styles/site.module.css";
import PillLabel from "@/components/site/PillLabel";

export default function SiteHeader() {
  // Once the page has scrolled, the bar gets a backdrop and a hairline below it.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Phones: the links live in a menu panel. It closes on navigation and on
  // Escape, and the page behind it doesn't scroll while it's open.
  const [open, setOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const close = () => setOpen(false);
    router.events.on("routeChangeStart", close);
    return () => router.events.off("routeChangeStart", close);
  }, [router.events]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth > 760 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

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
              <PillLabel>Start a project</PillLabel>
            </Link>
            <button
              type="button"
              className={styles.menuButton}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <span className={`${styles.menuBars} ${open ? styles.menuBarsOpen : ""}`} aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </nav>

        <div id="site-menu" className={`${styles.menu} ${open ? styles.menuOpen : ""}`} hidden={!open}>
          <nav aria-label="Menu" className={styles.container}>
            <ul className={styles.menuLinks}>
              {[...NAV_LINKS, { label: "Contact", href: "/contact" }].map((link, i) => (
                <li key={link.label} style={{ "--i": i } as React.CSSProperties}>
                  {link.href.startsWith("http") ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label} <ArrowUpRightIcon aria-hidden />
                    </a>
                  ) : (
                    <Link href={link.href} aria-current={router.pathname === link.href ? "page" : undefined}>
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className={styles.menuFoot}>
              <a href={`mailto:${CONTACT.officeEmail}`}>{CONTACT.officeEmail}</a>
              <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
