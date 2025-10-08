"use client";

import { motion } from "framer-motion";

import styles from "@/styles";
import { fadeIn, staggerContainer } from "@/motion";
import { Heading } from "@/components";

const World: React.FC = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <Heading
      title="Delivering Great Software Worldwide."
      className="padding-x padding-y pb-[50px] border-b border-[#21212155]"
    />

    <motion.div variants={fadeIn("up", "tween", 0.4, 1)} className="w-full my-[50px] py-[20px]">
      <div className="padding-x w-full flex sm:flex-col xm:flex-col gap-[30px] justify-between">
        <div className="w-[50%] sm:w-full xm:w-full">
          <h3 className="sub-paragraph font-medium text-secondry font-Aloevera">Global Reach, Local Impact.</h3>
        </div>

        <div className="w-[50%] sm:w-full xm:w-full">
          <div className="w-full flex gap-[30px] h-full items-end sm:items-start sm:flex-col xm:items-start xm:flex-col">
            <div className="w-[50%] sm:w-[90%] xm:w-[90%]">
              <p className="sub-paragraph font-medium font-Aloevera text-secondry tracking-wide">
                We create tailored software worldwide, boosting efficiency.
              </p>
            </div>

            <div className="w-[50%] sm:w-[90%] xm:w-[90%">
              <p className="sub-paragraph font-medium font-Aloevera text-secondry tracking-wide">
                From strategy to solid dev and audit, our tech ensures your success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>

    <motion.div
      // @ts-ignore
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col`}
    >
      <motion.div variants={fadeIn("up", "tween", 0.3, 1)} className="relative mb-[50px] flex w-full h-[550px]">
        <img src="/map.png" alt="map" className="w-full h-full object-cover" />

        <div className="absolute bottom-20 right-20 w-[70px] h-[70px] p-[6px] rounded-full bg-wayberBlue">
          <img src="people-01.png" alt="people" className="w-full h-full" />
        </div>

        <div className="absolute top-10 left-20 w-[70px] h-[70px] p-[6px] rounded-full bg-wayberBlue">
          <img src="/people-02.png" alt="people" className="w-full h-full" />
        </div>

        <div className="absolute top-1/2 left-[45%] w-[70px] h-[70px] p-[6px] rounded-full bg-wayberBlue">
          <img src="people-03.png" alt="people" className="w-full h-full" />
        </div>
      </motion.div>
    </motion.div>
  </section>
);

export default World;
