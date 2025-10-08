import Image from "next/image";
import { BackgroundImg } from "@/components";

export default function CaseWorks({ project }: { project: any }) {
  return (
    <section className="w-full padding-y">
      <div className="w-full flex flex-col">
        <h2 className="sub-heading padding-x font-medium font-aloevera text-secondry pb-[50px]">Project Gallery</h2>
        <div className="w-full border-t border-[#21212155] pt-[20px]">
          <div className="w-full flex sm:flex-col xm:flex-col justify-between gap-y-[15px] padding-x">
            <div className="w-1/2 sm:w-full xm:w-full">
              <h3 className="paragraph font-medium text-secondry font-aloevera">Visual Showcase:</h3>
            </div>
            <div className="w-1/2 sm:w-full xm:w-full">
              <div className="flex flex-col gap-y-[20px]">
                <p className="paragraph font-aloevera text-secondry">
                  A comprehensive visual journey through the {project.title} project, showcasing the design process, key
                  features, and final implementation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Images Grid */}
      <div className="w-full padding-x padding-y">
        <BackgroundImg src={project.images[0]} />
      </div>

      <div className="w-[80%] mx-auto padding-x flex gap-[40px] sm:w-full xm:w-full sm:flex-col xm:flex-col">
        <div className="w-[49%] sm:w-full xm:w-full">
          <Image src={project.images[1]} className="w-full object-cover rounded-[20px]" alt="project showcase" />
        </div>
        <div className="w-[49%] sm:w-full xm:w-full">
          <Image src={project.images[2]} className="w-full object-cover rounded-[20px]" alt="project showcase" />
        </div>
      </div>

      <div className="w-full padding-x padding-y">
        <BackgroundImg src={project.images[3]} />
      </div>

      <div className="w-[80%] mx-auto padding-x flex gap-[40px] sm:w-full xm:w-full sm:flex-col xm:flex-col">
        <div className="w-[49%] sm:w-full xm:w-full">
          <Image src={project.images[4]} className="w-full object-cover rounded-[20px]" alt="project showcase" />
        </div>
        <div className="w-[49%] sm:w-full xm:w-full">
          <Image src={project.src} className="w-full object-cover rounded-[20px]" alt="project showcase" />
        </div>
      </div>
    </section>
  );
}
