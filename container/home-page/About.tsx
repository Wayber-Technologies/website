"use client";
import Image from "next/image";
import { useState } from "react";
import { wayberBg1 } from "@/public";
import { LinkHover } from "@/animation";
import { footerItems } from "@/constants";
import { Heading, RoundButton } from "@/components";

export default function About() {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="w-full bg-wayberLightBlue padding-y rounded-t-[20px] z-20 relative mt-[-15px]">
      <div className="pl-[50px] sm:px-[20px] xm:px-[20px]">
        <h2 className="sub-heading font-medium font-Aloevera text-secondry">
          At Wayber, we know{" "}
          <span className="sub-heading font-medium font-Aloevera link-flash cursor-pointer">building technology </span>{" "}
          can feel overwhelming. That’s why{" "}
          <span className="sub-heading font-medium font-Aloevera link-flash cursor-pointer">we stay with you</span>
          &nbsp;
          <span className="sub-heading font-medium font-Aloevera link-flash cursor-pointer">through development,</span>
          &nbsp;and beyond.
        </h2>
      </div>

      <div className="w-full border-y border-[#21212155] my-[50px] py-[20px]">
        <div className="padding-x pb-[50px] w-full flex sm:flex-col xm:flex-col gap-[30px] justify-between">
          <div className="w-[50%] sm:w-full xm:w-full">
            <h3 className="sub-paragraph font-medium text-secondry font-Aloevera">What you can expect?</h3>
          </div>

          <div className="w-[50%] sm:w-full xm:w-full">
            <div className="w-full flex gap-[30px] h-full items-end sm:items-start sm:flex-col xm:items-start xm:flex-col">
              <div className="w-[50%] sm:w-[90%] xm:w-[90%]">
                <p className="sub-paragraph font-medium font-Aloevera text-secondry tracking-wide">
                  During development → We simplify choices, explain trade-offs, and adapt fast when your needs evolve.
                </p>

                <p className="sub-paragraph font-medium font-Aloevera text-secondry pt-[30px] tracking-wide">
                  At launch → We help you transition smoothly, minimize downtime, and guide your team.
                </p>

                <p className="sub-paragraph font-medium font-Aloevera text-secondry pt-[30px] tracking-wide">
                  After delivery → We stay close, supporting, optimizing, and securing your systems as you scale.
                </p>
              </div>

              <div className="w-[50%] flex justify-end flex-col sm:w-full xm:w-full">
                <h1 className="sub-paragraph font-medium font-Aloevera text-secondry pb-[20px]">S:</h1>
                <div className="flex flex-col">
                  {footerItems.map((item) => (
                    <LinkHover
                      key={item.id}
                      className="w-fit sub-paragraph font-medium capitalize before:h-[1px] after:h-[1px] before:bottom-[1px] after:bottom-[1px]"
                      title={item.title}
                      href={"/"}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between padding-x sm:flex-col xm:flex-col gap-[30px]">
        <div className="flex flex-col gap-[30px]">
          <Heading title="Empathy talk:" />
          <div
            className="w-fit flex items-center justify-between bg-secondry cursor-pointer rounded-full group"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <RoundButton
              href="/ochi-team"
              title="read more"
              bgcolor="#000"
              className="bg-white text-black"
              style={{ color: "#fff" }}
            />
          </div>
        </div>

        <div
          className={`w-[50%] sm:w-full xm:w-full transition transform duration-[1.5s] ease-[.215,.61,.355,1] rounded-[15px] overflow-hidden ${
            hovered && "scale-[0.96]"
          }`}
        >
          <Image
            src={wayberBg1}
            alt="about-img"
            className={`w-full h-full transition transform duration-[2s] ease-[.215,.61,.355,1] ${
              hovered && "scale-[1.09]"
            }`}
          />
        </div>
      </div>
    </section>
  );
}
