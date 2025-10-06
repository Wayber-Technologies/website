import Link from "next/link";
import Image from "next/image";
import { logoWhite } from "@/public";
import { LinkHover, TextMask } from "@/animation";
import { footerItems, footernavbarItems } from "@/constants";
import RoundButton from "./RoundButton";
import Rounded from "./Rounded";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const phrase = ["Let's Build"];
  const phrase1 = ["GREAT COMPANY"];
  return (
    <footer className="w-full min-h-screen padding-x z-30 relative pt-[40px] bg-wayberBlue flex flex-col justify-between rounded-t-[20px] mt-[-20px]">
      <div className="w-full flex justify-between sm:flex-col xm:flex-col">
        <div className="flex flex-col justify-between sm:w-full xm:w-full w-1/2">
          <h1 className="text-[150px] leading-[115px] lg:text-[130px] lg:leading-[98px] md:text-[100px] md:leading-[75px] sm:text-[74px] sm:leading-[68px] xm:text-[64px] xm:leading-[48px] font-semibold font-FoundersGrotesk text-white uppercase">
            <TextMask>{phrase}</TextMask>
          </h1>
        </div>
        <div className="h-full flex flex-col justify-between sm:w-full xm:w-full w-1/2">
          <div>
            <h1 className="text-[150px] leading-[115px] lg:text-[130px] lg:leading-[98px] md:text-[100px] md:leading-[75px] sm:text-[74px] sm:leading-[68px] xm:text-[64px] xm:leading-[48px] font-semibold font-FoundersGrotesk text-white uppercase">
              <TextMask>{phrase1}</TextMask>
            </h1>
            <div className="pt-[50px]">
              <div className="flex flex-col gap-y-[30px]">
                <p className="w-[60%] sub-paragraph font-medium font-Aloevera text-white pt-[30px] tracking-wide">
                  After delivery → We stay close, supporting, optimizing, and securing your systems as you scale.
                </p>
                <div className="w-fit flex items-center justify-between bg-white text-black cursor-pointer rounded-full group">
                  <div
                    className="w-fit flex items-center justify-between bg-white text-black cursor-pointer rounded-full group"
                    onMouseEnter={(e) => {
                      const text = e.currentTarget.querySelector("p");
                      if (text) text.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      const text = e.currentTarget.querySelector("p");
                      if (text) text.style.color = "#000";
                    }}
                  >
                    <RoundButton
                      href="/contact"
                      title="let's start"
                      bgcolor="#000"
                      className="bg-black text-white hover:bg-black transition-colors duration-300"
                      style={{
                        color: "#000",
                        transition: "color 0.3s ease",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="pt-[50px]">
                <h1 className="paragraph font-medium font-NeueMontreal text-white pb-[20px]">L:</h1>
                {footerItems.map((item) => (
                  <LinkHover
                    title={item.title}
                    href={item.href}
                    key={item.id}
                    className="before:h-[1px] before:bg-white after:h-[1px] after:bg-white w-fit paragraph font-medium text-white capitalize flex flex-col before:bottom-[1px] after:bottom-[1px]"
                  />
                ))}
              </div>
              <div className="pt-[50px]">
                <h1 className="paragraph font-medium font-NeueMontreal text-white pb-[20px]">M:</h1>
                {footernavbarItems.map((item) => (
                  <LinkHover
                    key={item.id}
                    title={item.title}
                    href={item.href}
                    className="before:h-[1px] before:bg-white after:h-[1px] after:bg-white w-fit paragraph font-medium text-white capitalize flex flex-col before:bottom-[1px] after:bottom-[1px]"
                  />
                ))}
              </div>
            </div>
            <div className="pt-[50px] flex gap-x-[20px]">
              <h1 className="paragraph font-medium font-NeueMontreal text-white">E:</h1>
              <LinkHover
                title="hello@wayber.tech"
                href="/"
                className="before:h-[1px] before:bg-white after:h-[1px] after:bg-white paragraph font-medium text-white before:bottom-[-3px] after:bottom-[-3px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full pt-[40px] pb-[30px] flex justify-between sm:flex-col xm:flex-col sm:gap-[20px] xm:gap-[20px]">
        <div className="w-1/2 sm:w-full xm:w-full">
          <Link href={"/"}>
            <Image src={logoWhite} alt="wayber logo" width={50} height={50} />
          </Link>
        </div>
        <div className="w-1/2 h-full flex gap-[10px] justify-between items-end sm:w-full xm:w-full sm:flex-col xm:flex-col sm:items-start xm:items-start">
          <div className="flex sm:flex-col xm:flex-col gap-[10px]">
            <h1 className="paragraph font-medium font-NeueMontreal text-white opacity-40">© wayber tech 2025.</h1>
            <LinkHover
              title="Legal Terms"
              href="/"
              className="before:h-[1px] before:bg-white after:h-[1px] after:bg-white paragraph font-medium text-white opacity-40 before:bottom-[-3px] after:bottom-[-3px]"
            />
          </div>
          <div>
            <LinkHover
              title="Website by Vinyl"
              href="https://vinyldavyl.xyz"
              className="before:h-[1px] before:bg-white after:h-[1px] after:bg-white paragraph font-medium text-white opacity-40 before:bottom-[-3px] after:bottom-[-3px]"
            />
          </div>
        </div>
      </div>

      {/* Full-bleed oversized word using Tailwind only */}
      <div
        className="w-screen relative bottom-0 left-1/2 -translate-x-1/2 overflow-hidden select-none"
        aria-hidden="true"
        role="presentation"
      >
        <span className="block w-full text-center text-white uppercase -mb-2 lg:-mb-4 font-FoundersGrotesk font-extrabold tracking-[0.045em] leading-[0.8] text-[38vw] lg:text-[38vw] md:text-[38vw] sm:text-[38vw] xm:text-[38vw] translate-y-[4vw] sm:translate-y-[4vw] xm:translate-y-[4vw]">
          WAYBER
        </span>
      </div>
    </footer>
  );
}
