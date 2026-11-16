import type { GetStaticProps } from "next";
import SiteLayout from "@/components/site/SiteLayout";
import Hero from "@/components/site/Hero";
import Studio, { Journal } from "@/components/site/Studio";
import Capabilities from "@/components/site/Capabilities";
import Work, { Clients } from "@/components/site/Work";
import Contact from "@/components/site/Contact";
import { getMediumArticles, type Article } from "@/lib/medium";

type Props = { articles: Article[] };

// The journal comes from Medium; the page is rebuilt with fresh articles at most once an hour.
export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: { articles: await getMediumArticles() },
  revalidate: 3600,
});

export default function Home({ articles }: Props) {
  return (
    <SiteLayout
      title="Wayber Technologies · Software studio in Lagos"
      description="Wayber Technologies designs, builds and looks after web platforms, mobile apps and the systems underneath them."
    >
      <Hero />
      <Clients tight />
      <Studio />
      <Capabilities />
      <Work />
      <Journal articles={articles} />
      <Contact />
    </SiteLayout>
  );
}
