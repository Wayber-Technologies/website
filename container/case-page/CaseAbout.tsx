import { BackgroundImg } from "@/components";

export default function CaseAbout({ project }: { project: any }) {
  return (
    <section className="w-full padding-y">
      <div className="w-full flex flex-col">
        <h2 className="sub-heading padding-x font-medium font-aloevera text-secondry pb-[50px]">Company</h2>
        <div className="w-full border-t border-[#21212155] pt-[20px]">
          <div className="w-full flex sm:flex-col xm:flex-col justify-between gap-[15px] padding-x">
            <div className="w-1/2 sm:w-full xm:w-full">
              <h3 className="paragraph font-medium text-secondry font-aloevera">About:</h3>
            </div>
            <div className="w-1/2 sm:w-full xm:w-full flex justify-between gap-[10px] sm:flex-col xm:flex-col">
              <div>
                <p className="paragraph font-aloevera text-secondry">{project.about}</p>
              </div>
              <div className="flex flex-col gap-y-[10px]">
                <div>
                  <p className="paragraph font-aloevera text-secondry underline">Industry:</p>
                  <p className="paragraph font-aloevera text-secondry">
                    {project.title === "SISE" && "Lead Management Software"}
                    {project.title === "MALLLAM-X" && "Digital Currency Exchange"}
                    {project.title === "RFTF" && "Fitness & Community Platform"}
                    {project.title === "BURNOUT" && "Team Management Software"}
                    {project.title === "COMMERCIO" && "Investment Platform"}
                  </p>
                </div>
                <div>
                  <p className="paragraph font-aloevera text-secondry underline">Company Size:</p>
                  <p className="paragraph font-aloevera text-secondry">
                    {project.title === "SISE" && "50+ People"}
                    {project.title === "MALLLAM-X" && "100+ People"}
                    {project.title === "RFTF" && "500+ People"}
                    {project.title === "BURNOUT" && "25+ People"}
                    {project.title === "COMMERCIO" && "200+ People"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full padding-x pt-[100px] lg:pt-[80px] md:pt-[60px] sm:pt-[40px] xm:pt-[40px]">
        <BackgroundImg src={project.images[1]} />
      </div>
    </section>
  );
}
