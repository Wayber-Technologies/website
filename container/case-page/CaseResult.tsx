export default function CaseResult({ project }: { project: any }) {
  return (
    <section className="w-full padding-y">
      <div className="w-full flex flex-col">
        <h1 className="sub-heading padding-x font-medium font-aloevera text-secondry pb-[50px]">The Result</h1>
        <div className="w-full border-t border-[#21212155] pt-[20px]">
          <div className="w-full flex sm:flex-col xm:flex-col justify-between gap-y-[20px] padding-x">
            <div className="w-1/2 sm:w-full xm:w-full">
              <h3 className="paragraph font-medium text-secondry font-aloevera">Project Outcomes:</h3>
            </div>
            <div className="w-1/2 sm:w-full xm:w-full flex sm:flex-col xm:flex-col gap-[20px]">
              <div className="flex flex-col gap-y-[10px] sm:w-full xm:w-full">
                <p className="paragraph font-aloevera text-secondry underline">Feedback</p>
                <p className="paragraph font-aloevera text-secondry">
                  &quot;The project exceeded our expectations with its innovative approach and
                  <br className="sm:hidden xm:hidden" /> user-friendly design. The team delivered exactly what we needed
                  <br className="sm:hidden xm:hidden" /> to create a better experience for our users and
                  stakeholders.&quot;
                </p>
              </div>
              <div className="flex flex-col gap-y-[10px] sm:w-full xm:w-full">
                <p className="paragraph font-aloevera text-secondry underline">The Result</p>
                <p className="paragraph font-aloevera text-secondry">{project.result}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
