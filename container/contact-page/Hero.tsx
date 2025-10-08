import Image from "next/image";
import { contactHero } from "@/public";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="w-full padding-x">
      <div className="w-full mt-[80px] sm:mt-[60px] xm:mt-[50px] flex flex-col">
        <div className="w-full margin">
          <div className="flex leading-[6.95]  flex-col">
            {/* First line with image and "LET'S START" */}
            <div className="flex items-center leading-[6.95]  gap-[10px] md:gap-[8px]">
              {/* Hide image on mobile */}
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "auto" }}
                transition={{
                  ease: [0.86, 0, 0.07, 0.995],
                  duration: 1,
                  delay: 1.5,
                }}
                className="flex-shrink-0 hidden md:block lg:block"
              >
                <Image
                  width={120}
                  height={95}
                  src={contactHero}
                  alt="Start project"
                  className="w-[120px] h-[95px] lg:w-[120px] lg:h-[95px] md:w-[80px] md:h-[64px] object-cover rounded-[10px]"
                />
              </motion.span>
              <h1 className="heading tracking-[1.3px] text-[#212121] font-semibold font-aloevera uppercase leading-[6.95] md:leading-[1]">
                LET&apos;S START
              </h1>
            </div>
          </div>
        </div>

        <div className="w-full pb-[15px] mt-8 md:mt-6">
          <h3 className="paragraph font-medium text-secondry font-NeueMontreal">Fill the form below:</h3>
        </div>
      </div>
    </section>
  );
}
