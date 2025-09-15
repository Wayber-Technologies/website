"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useTransform, motion, useScroll } from "framer-motion";
import { whatwedoImg1, whatwedoImg2, whatwedoImg3, whatwedoImg4 } from "@/public";

export default function Card() {
  const container1 = useRef(null);
  const container2 = useRef(null);
  const container3 = useRef(null);
  const container4 = useRef(null);

  const { scrollYProgress: scrollYProgress1 } = useScroll({
    target: container1,
    offset: ["start end", "start start"],
  });

  const { scrollYProgress: scrollYProgress2 } = useScroll({
    target: container2,
    offset: ["start end", "start start"],
  });

  const { scrollYProgress: scrollYProgress3 } = useScroll({
    target: container3,
    offset: ["start end", "start start"],
  });

  const { scrollYProgress: scrollYProgress4 } = useScroll({
    target: container4,
    offset: ["start end", "start start"],
  });

  const imageScale1 = useTransform(scrollYProgress1, [0, 1], [0.7, 1]);
  const imageScale2 = useTransform(scrollYProgress2, [0, 1], [0.7, 1]);
  const imageScale3 = useTransform(scrollYProgress3, [0, 1], [0.7, 1]);
  const imageScale4 = useTransform(scrollYProgress4, [0, 1], [0.7, 1]);

  return (
    <>
      {/* Card 1 */}
      <div
        ref={container1}
        className="h-auto flex items-center justify-center sticky top-40 w-full xm:top-[10%] sm:top-[10%]"
      >
        <motion.div
          style={{
            backgroundColor: "#09182f",
            top: `calc(-5vh + ${1 * 25}px)`,
          }}
          className="w-full p-20 xm:p-7 sm:p-7 flex justify-between rounded-t-[30px] rounded-b-none gap-10 relative -top-[45%] h-[800px] xm:h-auto sm:h-auto transform origin-top xm:flex-col sm:flex-col"
        >
          <div className="w-1/2 xm:w-full sm:w-full h-full flex flex-col gap-14 pt-10 xm:pt-5 sm:pt-5 xm:gap-5 sm:gap-5">
            <div className="flex flex-col gap-2">
              <h4 className="text-[24px] xm:text-lg sm:text-lg leading-tight tracking-tighter text-white">
                Strategy & Consulting
              </h4>
              <h2 className="text-[80px] xm:text-[40px] sm:text-[40px] xm:leading-none sm:leading-none font-bold leading-[80px] tracking-tighter text-white">
                Digital
                <br />
                Strategy
              </h2>
              <h4 className="text-[20px] sm:text-lg xm:text-lg leading-normal tracking-tighter text-gray-300">
                We help brands define their digital roadmap and create strategies that drive growth and engagement.
              </h4>
            </div>
            <div className="w-fit flex flex-col gap-2">
              <Link className="text-[18px] font-normal leading-tight tracking-tight text-blue-400" href="/">
                Learn more about our strategy services
              </Link>
              <div className="w-full h-[1px] rounded-lg bg-blue-400" />
            </div>
          </div>
          <motion.div
            className="w-1/2 xm:w-full sm:w-full h-full flex items-center justify-center"
            style={{ scale: imageScale1 }}
          >
            <Image src={whatwedoImg1} alt="Digital Strategy" className="w-[80%] object-cover" />
          </motion.div>
        </motion.div>
      </div>

      {/* Card 2 */}
      <div
        ref={container2}
        className="h-auto flex items-center justify-center sticky top-40 xm:top-[10%] sm:top-[10%] w-full"
      >
        <motion.div
          style={{
            backgroundColor: "#1462ff",
            top: `calc(-5vh + ${2 * 25}px)`,
          }}
          className="w-full p-20 xm:p-7 sm:p-7 flex justify-between rounded-t-[30px] rounded-b-none gap-10 relative -top-[45%] h-[800px] xm:h-auto sm:h-auto transform origin-top xm:flex-col sm:flex-col"
        >
          <div className="w-1/2 xm:w-full sm:w-full h-full flex flex-col gap-14 pt-10 xm:pt-5 sm:pt-5 xm:gap-5 sm:gap-5">
            <div className="flex flex-col gap-2">
              <h4 className="text-[24px] xm:text-lg sm:text-lg leading-tight tracking-tighter text-white">
                Design & Development
              </h4>
              <h2 className="text-[80px] xm:text-[40px] sm:text-[40px] xm:leading-none sm:leading-none font-bold leading-[80px] tracking-tighter text-white">
                Web
                <br />
                Development
              </h2>
              <h4 className="text-[20px] sm:text-lg xm:text-lg leading-normal tracking-tighter text-gray-300">
                Custom web solutions that combine beautiful design with powerful functionality to deliver exceptional
                user experiences.
              </h4>
            </div>
            <div className="w-fit flex flex-col gap-2">
              <Link className="text-[18px] font-normal leading-tight tracking-tight text-green-400" href="/">
                Explore our development work
              </Link>
              <div className="w-full h-[1px] rounded-lg bg-green-400" />
            </div>
          </div>
          <motion.div
            className="w-1/2 xm:w-full sm:w-full h-full flex items-center justify-center"
            style={{ scale: imageScale2 }}
          >
            <Image src={whatwedoImg2} alt="Web Development" className="w-[80%] object-cover" />
          </motion.div>
        </motion.div>
      </div>

      {/* Card 3 */}
      <div
        ref={container3}
        className="h-auto flex items-center justify-center sticky top-40 xm:top-[10%] sm:top-[10%] w-full"
      >
        <motion.div
          style={{
            backgroundColor: "#09182f",
            top: `calc(-5vh + ${3 * 25}px)`,
          }}
          className="w-full p-20 xm:p-7 sm:p-7 flex justify-between rounded-t-[30px] rounded-b-none gap-10 relative -top-[45%] h-[800px] transform origin-top xm:flex-col sm:flex-col"
        >
          <div className="w-1/2 xm:w-full sm:w-full h-full flex flex-col gap-14 pt-10 xm:pt-5 sm:pt-5 xm:gap-5 sm:gap-5">
            <div className="flex flex-col gap-2">
              <h4 className="text-[24px] xm:text-lg sm:text-lg leading-tight tracking-tighter text-white">
                Brand & Identity
              </h4>
              <h2 className="text-[80px] xm:text-[40px] sm:text-[40px] xm:leading-none sm:leading-none font-bold leading-[80px] tracking-tighter text-white">
                Brand
                <br />
                Design
              </h2>
              <h4 className="text-[20px] sm:text-lg xm:text-lg leading-normal tracking-tighter text-gray-300">
                Creating memorable brand identities that resonate with your audience and stand out in competitive
                markets.
              </h4>
            </div>
            <div className="w-fit flex flex-col gap-2">
              <Link className="text-[18px] font-normal leading-tight tracking-tight text-purple-400" href="/">
                View our branding projects
              </Link>
              <div className="w-full h-[1px] rounded-lg bg-purple-400" />
            </div>
          </div>
          <motion.div
            className="w-1/2 xm:w-full sm:w-full h-full flex items-center justify-center"
            style={{ scale: imageScale3 }}
          >
            <Image src={whatwedoImg3} alt="Brand Design" className="w-[80%] object-cover" />
          </motion.div>
        </motion.div>
      </div>

      {/* Card 4 */}
      <div
        ref={container4}
        className="h-auto flex items-center justify-center sticky top-40 xm:top-[10%] sm:top-[10%] w-full"
      >
        <motion.div
          style={{
            backgroundColor: "#1462ff",
            top: `calc(-5vh + ${4 * 25}px)`,
          }}
          className="w-full p-20 xm:p-7 sm:p-7 flex justify-between rounded-t-[30px] rounded-b-none gap-10 relative -top-[45%] h-[800px] transform origin-top xm:flex-col sm:flex-col"
        >
          <div className="w-1/2 xm:w-full sm:w-full h-full flex flex-col gap-14 pt-10 xm:pt-5 sm:pt-5 xm:gap-5 sm:gap-5">
            <div className="flex flex-col gap-2">
              <h4 className="text-[24px] xm:text-lg sm:text-lg leading-tight tracking-tighter text-white">
                Marketing & Growth
              </h4>
              <h2 className="text-[80px] xm:text-[40px] sm:text-[40px] xm:leading-none sm:leading-none font-bold leading-[80px] tracking-tighter text-white">
                Digital
                <br />
                Marketing
              </h2>
              <h4 className="text-[20px] sm:text-lg xm:text-lg leading-normal tracking-tighter text-gray-300">
                Data-driven marketing campaigns that amplify your brand reach and convert prospects into loyal
                customers.
              </h4>
            </div>
            <div className="w-fit flex flex-col gap-2">
              <Link className="text-[18px] font-normal leading-tight tracking-tight text-orange-400" href="/">
                Discover our marketing solutions
              </Link>
              <div className="w-full h-[1px] rounded-lg bg-orange-400" />
            </div>
          </div>
          <motion.div
            className="w-1/2 xm:w-full sm:w-full h-full flex items-center justify-center"
            style={{ scale: imageScale4 }}
          >
            <Image src={whatwedoImg4} alt="Digital Marketing" className="w-[80%] object-cover" />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
