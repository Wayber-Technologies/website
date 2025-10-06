"use client";
import Link from "next/link";
import Image from "next/image";
import { ochiside } from "@/public";
import { Eyes } from "@/components";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full min-h-screen">
      <div className="w-full flex flex-col justify-between">
        <div className="w-full flex flex-col">
          <div className="w-full margin padding-x">
            <div>
              <h1 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-Aloevera uppercase">
                WE ARE <br />
                <div className="flex items-center gap-[5px]">
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "auto" }}
                    transition={{
                      ease: [0.86, 0, 0.07, 0.995],
                      duration: 1,
                      delay: 1.5,
                    }}
                  >
                    <video
                      src="/heroVideo4.mp4"
                      width={120}
                      height={50}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="hero-inline-video"
                      style={{
                        width: "auto",
                        height: "95px",
                        objectFit: "cover",
                        marginTop: "10px",
                        borderRadius: "10px",
                      }}
                    />
                    <style jsx>{`
                      @media (min-width: 1491px) {
                        .hero-inline-video {
                          margin-top: 15px;
                        }
                      }
                      @media (min-width: 769px) and (max-width: 1024px) {
                        .hero-inline-video {
                          width: 100px;
                          height: 63px;
                        }
                      }
                      @media (min-width: 401px) and (max-width: 768px) {
                        .hero-inline-video {
                          width: 74px;
                          height: 45px;
                        }
                      }
                      @media (max-width: 400px) {
                        .hero-inline-video {
                          width: 64px;
                          height: 40px;
                        }
                      }
                    `}</style>
                  </motion.span>
                  <h1 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-Aloevera uppercase">
                    WAYBER TECH
                  </h1>
                </div>
              </h1>
            </div>
          </div>
          <div className="w-full border-t border-[#21212155] pt-[20px]">
            <div className="w-full flex justify-between  padding-x sm:flex-col xm:flex-col gap-[20px]">
              <div className="w-[10%] sm:w-full xm:w-full">
                <h3 className="paragraph font-medium text-secondry font-Aloevera">About us:</h3>
              </div>
              <div className="w-[48%] flex justify-between sm:w-full xm:w-full sm:flex-col xm:flex-col gap-[20px]">
                <div className="w-[50%] flex flex-col gap-y-[40px] sm:w-full xm:w-full">
                  <div className="flex flex-col gap-y-[20px]">
                    <p className="paragraph font-Aloevera text-secondry">
                      Wayber - means eyes. It&apos;s not
                      <br /> just a beautiful word, but our philosophy.
                      <br />
                      Almost everything that needs to be
                      <br /> communicated is better shown than <br />
                      explained.
                    </p>
                  </div>
                  <div className="flex flex-col gap-y-[20px]">
                    <p className="paragraph font-Aloevera text-secondry">
                      We believe a great presentation evokes
                      <br />
                      interest and drives business results far
                      <br /> better than any saying can. Hence, we
                      <br />
                      founded wayber to help you persuade
                      <br /> colleagues and clients by creating eye-
                      <br />
                      opening presentations.
                    </p>
                  </div>
                </div>
                <div className="flex w-fit h-fit gap-[5px] group">
                  <div className="rounded-[50px] border border-[#21212199] group-hover:bg-secondry  py-[3px] px-[12px] cursor-pointer">
                    <Link
                      href="/case"
                      className="paragraph font-Aloevera text-secondry uppercase group-hover:text-background transition-all duration-200 ease-in"
                    >
                      Our Work
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
      <div className="padding-x">
        <h1 className="sub-heading font-medium font-Aloevera text-secondry">
          We save businesses from ugly and
          <br className="sm:hidden xm:hidden" /> ineffective presentations.
        </h1>
      </div>
    </section>
  );
}
