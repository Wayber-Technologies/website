"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { Curve, Marquee, Ready } from "@/components";
import { About, Clients, Hero, Projects, VideoHome } from "@/container";
import Whatwedo from "@/container/home-page/whatwedo";
import Process from "@/container/home-page/Process";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();

    return () => {};
  }, []);

  return (
    <>
      <Curve backgroundColor={"#ffffff"}>
        <Hero />

        <div className="w-full bg-marquee z-10 relative rounded-t-[20px] py-[60px] lg:py-[50px] md:py-[40px] sm:py-[30px] xm:py-[20px]">
          <Marquee
            title="we are wayber"
            className="pb-[30px] lg:pb-[25px] md:pb-[20px] sm:pb-[20px] xm:pb-[15px] text-[280px] leading-[200px] lg:text-[200px] lg:leading-[140px] md:text-[120px] md:leading-[80px] sm:text-[90px] sm:leading-[60px] xm:text-[60px] xm:leading-[40px]"
          />
        </div>
        <About />
        <Whatwedo />
        <VideoHome />
        <Projects />
        <Process />
        <Ready />
      </Curve>
    </>
  );
}
