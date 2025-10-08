import Image from "next/image";
import { BackgroundImg } from "@/components";

export default function CaseChallenge({ project }: { project: any }) {
  return (
    <section className="w-full pb-[100px] lg:pb-[80px] md:pb-[60px] sm:pb-[40px] xm:pb-[40px]">
      <div className="w-full flex flex-col">
        <h2 className="sub-heading padding-x font-medium font-aloevera text-secondry border-b pb-[50px] border-[#21212155]">
          Challenge & Solution
        </h2>
        <div className="w-full border-t border-[#21212155] pt-[20px]">
          <div className="w-full flex sm:flex-col xm:flex-col justify-between gap-y-[15px] padding-x">
            <div className="w-1/2 sm:w-full xm:w-full">
              <h3 className="paragraph font-medium text-secondry font-aloevera">Services we provided:</h3>
            </div>
            <div className="w-1/2 sm:w-full xm:w-full">
              <div className="flex flex-col gap-y-[20px]">
                <p className="paragraph font-aloevera text-secondry">{project.challenge}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full padding-x padding-y">
        <BackgroundImg src={project.images[2]} />
      </div>
      <div className="w-[80%] mx-auto padding-x flex gap-[40px] sm:w-full xm:w-full sm:flex-col xm:flex-col">
        <div className="w-[49%] sm:w-full xm:w-full">
          <Image src={project.images[3]} className="w-full object-cover rounded-[20px]" alt="challenge image" />
        </div>
        <div className="w-[49%] sm:w-full xm:w-full">
          <Image src={project.images[4]} className="w-full object-cover rounded-[20px]" alt="challenge image" />
        </div>
      </div>
    </section>
  );
}
