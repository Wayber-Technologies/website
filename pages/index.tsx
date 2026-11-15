import SiteLayout from "@/components/site/SiteLayout";
import Hero from "@/components/site/Hero";
import Studio from "@/components/site/Studio";
import Capabilities from "@/components/site/Capabilities";
import Work from "@/components/site/Work";
import Contact from "@/components/site/Contact";

export default function Home() {
  return (
    <SiteLayout
      title="Wayber Technologies · Software studio in Lagos"
      description="Wayber Technologies designs, builds and looks after web platforms, mobile apps and the systems underneath them."
      grid
    >
      <Hero />
      <Studio />
      <Capabilities />
      <Work />
      <Contact />
    </SiteLayout>
  );
}
