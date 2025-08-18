"use client";
import Link from "next/link";
import { useRef } from "react";
import TextMask from "@/components/TextMask";
import { ArrowUpRight } from "lucide-react";
import { Eyes, RoundButton, Rounded } from "@/components";
import { useScroll, useTransform, motion } from "framer-motion";

export default function Ready() {
  const container = useRef(null);
  const phrase = ["Ready", "to start", "the project"];

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const mq = useTransform(scrollYProgress, [0, 1], [0, -700]);

  return (
    <section
      className="w-full bg-[#EFD54D] relative z-30 min-h-screen sm:h-screen xm:h-screen padding-y rounded-t-[20px]"
      ref={container}
    >
      <div className="w-full h-full flex justify-center gap-[50px] items-center flex-col pt-36">
        <div className="flex flex-col gap-[10px]">
          <h1 className="text-[250px] leading-[200px] lg:text-[190px] lg:leading-[150px] md:text-[150px] md:leading-[110px] sm:text-[100px] sm:leading-[80px] xm:text-[70px] xm:leading-[55px] tracking-[-2.5px] text-center font-bold  text-secondry uppercase pointer-events-none">
            <TextMask>{phrase}</TextMask>
          </h1>
        </div>
        <div className="flex flex-col  items-center gap-[10px]">
          <div className="flex items-center justify-between bg-secondry cursor-pointer rounded-full group">
            <RoundButton
              href="/contact"
              title="start the project"
              className="bg-white text-black"
              bgcolor="#000"
              style={{ color: "#fff" }}
            />
          </div>
          <p className="text-[20px] font-NeueMontreal text-secondry">OR</p>
          <div className="flex items-center justify-between bg-transparent cursor-pointer rounded-full group border border-[#212121]">
            <Link
              className="xl:text-[18px] xl:leading-[28px] text-[14px] leading-[24px] uppercase font-normal font-NeueMontreal"
              href="/contact"
            >
              <Rounded className="py-[6px]" backgroundColor="#212121">
                <p className="z-10 px-[10px] ml-[15px] py-[6px] group-hover:text-white text-black">
                  hello@waybertechnologies.com
                </p>
                <div className="bg-black group-hover:bg-white text-black p-[10px] rounded-full scale-[0.3] mr-[10px] group-hover:scale-[0.9] transition-all z-10 transform duration-[0.3s] ease-[.215,.61,.355,1]">
                  <ArrowUpRight strokeWidth={1.5} size={30} className="scale-[0] group-hover:scale-[1]" />
                </div>
              </Rounded>
            </Link>
          </div>
        </div>
      </div>
      <motion.div
        className="w-full absolute top-[50%] transform translate-y-[-50%] gap-[30px] flex items-center justify-center pt-36"
        style={{ y: mq }}
      >
        <Eyes className="w-[200px] h-[200px] md:w-[170px] md:h-[170px] sm:w-[150px] sm:h-[150px] xm:w-[150px] xm:h-[150px] sm:flex-col xm:flex-col" />
      </motion.div>
    </section>
  );
}
