import Head from "next/head";
import { Figtree } from "next/font/google";
import SiteHeader from "@/components/home/SiteHeader";
import Hero from "@/components/home/Hero";
import Studio from "@/components/home/Studio";
import Capabilities from "@/components/home/Capabilities";
import Work from "@/components/home/Work";
import Contact from "@/components/home/Contact";
import SiteFooter from "@/components/home/SiteFooter";
import styles from "@/styles/home.module.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Wayber Technologies · Software studio in Lagos</title>
        <meta
          name="description"
          content="Wayber Technologies designs, builds and looks after web platforms, mobile apps and the systems underneath them."
        />
        <meta property="og:title" content="Wayber Technologies · Think big. Build broad. Be Wayber." />
        <meta
          property="og:description"
          content="A Lagos software studio building web platforms, mobile apps and fintech systems."
        />
      </Head>
      <div className={`${figtree.variable} ${styles.page}`}>
        <SiteHeader />
        <main>
          <Hero />
          <Studio />
          <Capabilities />
          <Work />
          <Contact />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
