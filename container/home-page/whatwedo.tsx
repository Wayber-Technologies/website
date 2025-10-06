"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { whatwedoCircleImg } from "@/public";
import Card from "@/components/wwd-cards";
import { Heading } from "@/components";

export default function Whatwedo() {
  return (
    <div id="what-we-do" className="w-full pt-20 pb-0 bg-[#BFFDFF] relative">
      <div className="w-full flex items-center padding-x justify-start">
        <Heading title="Smart Services That Scale With You." />
      </div>
      <div className="w-full py-20 pb-0 xm:py-10 sm:py-10">
        <Card />
      </div>
    </div>
  );
}
