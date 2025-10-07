"use client";

import { motion } from "framer-motion";

import { fadeIn } from "@/motion";
import { ExploreCardProps } from "@/types";
import Image from "next/image";

const ExploreCard: React.FC<ExploreCardProps> = ({
  id,
  imgUrl,
  title,
  index,
  active,
  handleClick,
  number,
  description,
}) => (
  <motion.div
    variants={fadeIn("right", "spring", index * 0.5, 0.75)}
    className={`relative  ${active === id ? "lg:flex-[3.5] flex-[10]" : "lg:flex-[0.5] flex-[2]"}
     flex items-center justify-center min-w-[170px] h-[700px] transition-[flex] duration-[0.7s] ease-out-flex cursor-pointer overflow-hidden`}
    onClick={() => handleClick(id)}
  >
    <Image
      src={imgUrl}
      alt="planet-04"
      className="absolute w-full h-full object-cover rounded-[10px] bg-[rgba(0,0,0,0.5)]"
      fill
    />
    {active !== id ? (
      <h3 className="font-Aloevera font-semibold sm:text-[26px] text-[18px] text-white absolute z-0 lg:bottom-20 lg:rotate-[-90deg] lg:origin-[0,0] sm:bottom-4 xm:bottom-4">
        {title}
      </h3>
    ) : (
      <div className="absolute bottom-0 p-8 flex justify-start w-full flex-col bg-[rgba(0,0,0,0.5)] rounded-b-[10px] max-h-[70%] sm:max-h-[unset] xm:max-h-[unset] overflow-hidden">
        <h1 className="font-Aloevera mb-[24px] font-semibold  text-white text-[60px] sm:text-[40px] xm:text-[40px]">
          {number}
        </h1>
        <p className="font-Aloevera text-[16px] leading-[20.16px] text-white uppercase text-ellipsis overflow-hidden h-[unset] sm:text-[14px] xm:text-[14px]">
          {description}
        </p>
        <h2 className="font-Aloevera mt-[24px] font-semibold sm:text-[32px] text-[24px] text-white ">{title}</h2>
      </div>
    )}
  </motion.div>
);

export default ExploreCard;
