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
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    whileHover={{ scale: active === id ? 1 : 1.02 }}
    className={`relative ${
      active === id ? "lg:flex-[3.5] flex-[10]" : "lg:flex-[0.5] flex-[2]"
    } flex items-center justify-center min-w-[170px] h-[700px] sm:h-[500px] xm:h-[500px] transition-[flex] duration-[0.7s] ease-out-flex cursor-pointer overflow-hidden rounded-[10px]`}
    onClick={() => handleClick(id)}
  >
    <Image src={imgUrl} alt={title} className="absolute w-full h-full object-cover rounded-[10px]" fill />

    {/* Dark overlay */}
    <div className="absolute inset-0 bg-[rgba(0,0,0,0.1)] rounded-[10px]" />

    {/* Inactive state  */}
    {active !== id ? (
      <h3 className="font-Aloevera font-semibold text-[26px] sm:text-[20px] xm:text-[20px] text-white z-10 lg:rotate-[-90deg] lg:origin-center lg:translate-x-0 px-4 text-center lg:text-left whitespace-nowrap">
        {title}
      </h3>
    ) : (
      /* Active state - content box */
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute bottom-0 p-6 sm:p-4 xm:p-4 flex justify-start w-full flex-col bg-[rgba(0,0,0,0.7)] rounded-b-[10px] lg:max-h-[60%] sm:h-[50%] xm:h-[50%]"
      >
        <h1 className="font-Aloevera mb-4 sm:mb-2 xm:mb-2 font-semibold text-white text-[60px] sm:text-[32px] xm:text-[32px] leading-tight">
          {number}
        </h1>
        <p className="font-Aloevera text-[16px] sm:text-[12px] xm:text-[12px] leading-[1.4] text-white uppercase mb-4 sm:mb-2 xm:mb-2 line-clamp-4 sm:line-clamp-3 xm:line-clamp-3">
          {description}
        </p>
        <h2 className="font-Aloevera font-semibold text-[32px] sm:text-[20px] xm:text-[20px] text-white leading-tight">
          {title}
        </h2>
      </motion.div>
    )}
  </motion.div>
);

export default ExploreCard;
