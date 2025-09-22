import Image from "next/image";
import { Marquee } from "@/components";
import { insightsPublicationItems } from "@/constants";

export default function Publication() {
  return (
    <section className="w-full bg-marquee padding-y rounded-t-[20px]">
      <div className="w-full bg-marquee z-10 relative rounded-t-[20px]">
        <Marquee
            title="insights from wayber"
            className="pb-[30px] lg:pb-[25px] md:pb-[20px] sm:pb-[20px] xm:pb-[15px] text-[280px] leading-[200px] lg:text-[200px] lg:leading-[140px] md:text-[120px] md:leading-[80px] sm:text-[90px] sm:leading-[60px] xm:text-[60px] xm:leading-[40px]"
          />
      </div>
      <div className="w-full padding-x py-[30px]">
        <div className="w-full flex justify-between gap-[20px] flex-wrap sm:flex-col xm:flex-col">
          <div>
            <h3 className="paragraph font-medium text-white font-Aloevera">Latest publication</h3>
          </div>
          <div className="w-[70%] flex gap-y-[20px] sm:flex-col xm:flex-col sm:w-full xm:w-full gap-[10px]">
            {insightsPublicationItems.map((item) => (
              <div className="w-full flex justify-between gap-[20px] sm:flex-col xm:flex-col" key={item.id}>
                <div className="w-full flex gap-[20px] rounded-[20px] flex-col">
                  <div className="group overflow-hidden rounded-[20px]">
                    <Image
                      src={item.src}
                      alt="img"
                      className="w-full h-full group-hover:scale-[1.09] transform duration-[1s] ease-[.4,0,.2,1]	"
                    />
                  </div>
                  <div className="flex gap-[10px] items-center">
                    <span className="w-[10px] h-[10px] rounded-full bg-white" />
                    <h4 className="paragraph uppercase font-medium font-Aloevera text-white">{item.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
