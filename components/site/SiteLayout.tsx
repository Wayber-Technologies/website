import Head from "next/head";
import { Figtree } from "next/font/google";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import styles from "@/styles/site.module.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});

// Brand typeface, used for the hero headline.
const aloevera = localFont({
  src: "../../fonts/Aloevera-SemiBold.woff2",
  weight: "600",
  variable: "--font-aloevera",
  display: "swap",
});

type Props = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function SiteLayout({ title, description, children }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={`${figtree.variable} ${aloevera.variable} ${styles.page}`}>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </div>
    </>
  );
}
