"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Curve, Ready } from "@/components";
import CaseHero from "@/container/case-page/CaseHero";
import CaseAbout from "@/container/case-page/CaseAbout";
import CaseChallenge from "@/container/case-page/CaseChallenge";
import CaseResult from "@/container/case-page/CaseResult";
import CaseWorks from "@/container/case-page/CaseWorks";
import { Works } from "@/container";

export default function CaseStudy() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  useEffect(() => {
    if (id) {
      // Import project data based on ID
      import("@/constants").then(({ projectItem }) => {
        // Create a mapping for project slugs
        const projectSlugMap: { [key: string]: string } = {
          "sise": "SISE",
          "mallamx": "MALLLAM-X",
          "rftf": "RFTF",
          "burnout": "BURNOUT",
          "commercio": "COMMERCIO",
        };

        const projectTitle = projectSlugMap[id as string];
        const foundProject = projectItem.find((item) => item.title === projectTitle);

        console.log("Looking for:", id, "Mapped to:", projectTitle, "Found project:", foundProject);
        setProject(foundProject);
      });
    }
  }, [id]);

  if (!project) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <p className="text-gray-600">The project &quot;{id}&quot; could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Curve backgroundColor="#ffffff">
        <CaseHero project={project} />
        <CaseAbout project={project} />
        <CaseChallenge project={project} />
        <CaseResult project={project} />
        <CaseWorks project={project} />
        <Works />
        <Ready />
      </Curve>
    </>
  );
}
