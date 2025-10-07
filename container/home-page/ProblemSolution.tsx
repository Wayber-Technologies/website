import { wayberBg4 } from "@/public";
import { BackgroundImg, Eyes } from "@/components";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ExploreCard from "@/components/ExploreCard";
import { useState } from "react";
import { solutions } from "@/constants";

export default function ProblemSolution() {
  const [active, setActive] = useState("solution-1");

  return (
    <section className="w-full padding-y">
      <div className="w-full flex flex-col justify-between">
        <div className="w-full flex flex-col">
          <div className="w-full margin padding-x">
            <div>
              <h1 className="sub-heading font-medium font-Aloevera text-secondry">
                The Problem:
                <br className="sm:hidden xm:hidden" /> Broken systems are breaking businesses.
              </h1>
            </div>
          </div>
          <div className="w-full border-t border-[#21212155] pt-[20px]">
            <div className="w-full flex justify-between  padding-x sm:flex-col xm:flex-col gap-[20px]">
              <div className="w-[10%] sm:w-full xm:w-full">
                <h3 className="paragraph font-medium text-secondry font-Aloevera">The Problem:</h3>
              </div>
              <div className="w-[48%] flex justify-between sm:w-full xm:w-full sm:flex-col xm:flex-col gap-[20px]">
                <div className="w-[50%] flex flex-col gap-y-[40px] sm:w-full xm:w-full">
                  <div className="flex flex-col gap-y-[20px]">
                    <p className="paragraph font-Aloevera text-secondry">
                      Outdated tech collapses under growth.
                      <br />
                      Security gaps put your data — and <br />
                      reputation — at risk.
                      <br />
                      Inefficient processes bleed time and <br />
                      money.
                      <br />
                      Patchwork solutions can’t keep up with <br />
                      your vision.
                      <br />
                      <br />
                      The result? Missed opportunities. Lost <br />
                      trust. Slow growth. We have eyes on it!
                    </p>
                  </div>
                </div>
                <div className="flex w-fit h-fit gap-[5px] group">
                  <div className="rounded-[50px] border border-[#21212199] group-hover:bg-secondry  py-[3px] px-[12px] cursor-pointer">
                    <Link
                      href="/case"
                      className="paragraph font-Aloevera text-secondry uppercase group-hover:text-background transition-all duration-200 ease-in"
                    >
                      View Insight
                    </Link>
                  </div>
                  <div className="w-[35px] flex items-center justify-center h-[35px] border border-[#21212199] rounded-[50px] p-[12px]  group-hover:bg-secondry transition-all duration-200 ease-in cursor-pointer sm:hidden xm:hidden">
                    <p className="paragraph font-normal text-secondry group-hover:text-background">
                      <ArrowUpRight strokeWidth={1.25} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="padding-y" data-scroll data-scroll-speed="-.1">
        <Eyes className="w-[300px] h-[300px] md:w-[200px] md:h-[200px] sm:w-[150px] sm:h-[150px] xm:w-[150px] xm:h-[150px] sm:flex-col xm:flex-col" />
      </div>
      <div className="padding-x mb-[80px]">
        <h1 className="sub-heading font-medium font-Aloevera text-secondry">
          The Solution:
          <br className="sm:hidden xm:hidden" /> We Build the Way Forward.
        </h1>
      </div>

      <div className="w-full flex flex-col">
        <div className="w-full border-t border-[#21212155] pt-[20px]">
          <div className="w-full flex justify-between padding-x sm:flex-col xm:flex-col gap-[30px]">
            <div className="w-[10%] sm:w-full xm:w-full">
              <h3 className="paragraph font-medium text-secondry font-Aloevera">Wayber Way:</h3>
            </div>
            <div className="w-[48%] sm:w-full xm:w-full flex justify-between">
              <div className="w-[50%] sm:w-full xm:w-full flex flex-col gap-y-[40px]">
                <div className="flex flex-col gap-y-[20px]">
                  <p className="paragraph font-Aloevera text-secondry">
                    The team of designers, storytellers, and
                    <br /> passionate collaborators, who work
                    <br /> together to create industry-shifting <br />
                    presentations that win people&apos;s hearts
                    <br />
                    and minds.
                  </p>
                </div>
                <div className="flex flex-col gap-y-[20px]">
                  <p className="paragraph font-Aloevera text-secondry">
                    We don’t just deliver software.
                    <br />
                    We deliver confidence, continuity,
                    <br /> and a clear way forward.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="padding-x mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
        {solutions.map((solution, index) => (
          <ExploreCard key={solution.id} {...solution} index={index} active={active} handleClick={setActive} />
        ))}
      </div>
    </section>
  );
}
