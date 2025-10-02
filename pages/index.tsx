"use client";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { Curve, Marquee, Ready, PreLoad } from "@/components";
import { About, Clients, Hero, Projects, VideoHome } from "@/container";
import Whatwedo from "@/container/home-page/whatwedo";
import Process from "@/container/home-page/Process";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const timeout = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = "default";
    }, 5000); // Extended to 5 seconds for more bounce animations

    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">{isLoading && <PreLoad />}</AnimatePresence>
      <Curve backgroundColor={"#ffffff"}>
        <Hero />

        <div className="w-full bg-marquee z-10 relative rounded-t-[20px] py-[60px] lg:py-[50px] md:py-[40px] sm:py-[30px] xm:py-[20px]">
          <Marquee
            title="we are wayber"
            className="pb-[30px] lg:pb-[25px] md:pb-[20px] sm:pb-[20px] xm:pb-[15px] text-[280px] leading-[200px] lg:text-[200px] lg:leading-[140px] md:text-[120px] md:leading-[80px] sm:text-[90px] sm:leading-[60px] xm:text-[60px] xm:leading-[40px]"
          />
        </div>
        <Whatwedo />
        <About />
        <VideoHome />
        <Projects />
        <Process />
        <Ready />
      </Curve>
    </>
  );
}
