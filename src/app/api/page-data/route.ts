import { NextResponse } from "next/server";
import {
  avatar,
  brand,
  innovation,
  onlinePresence,
  creativeMind,
  WebResultTag,
  startupPlan,
  faq,
  achievements,
} from "@/app/types/menu";

const avatarList: avatar[] = [
  {
    image: "/images/home/avatar_1.jpg",
    title: "Sarah Johnson",
  },
  {
    image: "/images/home/avatar_2.jpg",
    title: "Olivia Miller",
  },
  {
    image: "/images/home/avatar_3.jpg",
    title: "Sophia Roberts",
  },
  {
    image: "/images/home/avatar_4.jpg",
    title: "Isabella Clark",
  },
];

const brandList: brand[] = [
  {
    image: "/images/home/brand/brand5.png",
    darkImg: "/images/home/brand/brand5.png",
    title: "COOMMERCIO",
  },

  {
    image: "/images/home/brand/brand2.png",
    darkImg: "/images/home/brand/brand2.png",
    title: "MALLAM-X",
  },
  {
    image: "/images/home/brand/brand3.png",
    darkImg: "/images/home/brand/brand3.png",
    title: "RFTF",
  },
  {
    image: "/images/home/brand/brand4.png",
    darkImg: "/images/home/brand/brand4.png",
    title: "BURNOUT",
  },
  {
    image: "/images/home/brand/brand1.png",
    darkImg: "/images/home/brand/brand1.png",
    title: "SISE",
  },
];

const innovationList: innovation[] = [
  {
    image: "/images/home/innovation/brand.svg",
    title: "Brand\nStrategy",
    bg_color: "bg-purple/20",
    txt_color: "text-purple",
  },
  {
    image: "/images/home/innovation/digitalmarketing.svg",
    title: "Digital\nMarketing",
    bg_color: "bg-blue/20",
    txt_color: "text-blue",
  },
  {
    image: "/images/home/innovation/uiux.svg",
    title: "UI/UX\nDesign",
    bg_color: "bg-orange/20",
    txt_color: "text-orange",
  },
  {
    image: "/images/home/innovation/analitics.svg",
    title: "Analytics &\nReporting",
    bg_color: "bg-green/20",
    txt_color: "text-green",
  },
  {
    image: "/images/home/innovation/webdevp.svg",
    title: "Web\nDevelopment",
    bg_color: "bg-pink/20",
    txt_color: "text-pink",
  },
];

const onlinePresenceList: onlinePresence[] = [
  {
    image: "/images/home/onlinePresence/project1.png",
    title: "Sise",
    tag: ["Workflow Management", "Interface Design"],
    link: "https://www.sise.com/",
  },
  {
    image: "/images/home/onlinePresence/project2.png",
    title: "Mallam X",
    tag: ["E-Wallet", "Currency Exchange"],
    link: "https://www.mallamx.com/",
  },
  {
    image: "/images/home/onlinePresence/project3.png",
    title: "RFTF",
    tag: ["Fitness Tracking", "Event Management"],
    link: "https://www.rftf.com/",
  },
  {
    image: "/images/home/onlinePresence/project4.png",
    title: "Burnout",
    tag: ["Team Management", "Web & Mobile Design"],
    link: "https://www.burnout.com/",
  },
  {
    image: "/images/home/onlinePresence/project5.png",
    title: "Commercio",
    tag: ["Investment Platform", "Mobile Banking"],
    link: "https://www.commercio.com/",
  },
];

const creativeMindList: creativeMind[] = [
  {
    image: "/images/home/creative/creative_img_1.png",
    name: "Logan Dang",
    position: "WordPress Developer",
    twitterLink: "https://x.com/",
    linkedinLink: "https://in.linkedin.com/",
  },
  {
    image: "/images/home/creative/creative_img_2.png",
    name: "Ana Belić",
    position: "Social Media Specialist",
    twitterLink: "https://x.com/",
    linkedinLink: "https://in.linkedin.com/",
  },
  {
    image: "/images/home/creative/creative_img_3.png",
    name: "Brian Hanley",
    position: "Product Designer",
    twitterLink: "https://x.com/",
    linkedinLink: "https://in.linkedin.com/",
  },
  {
    image: "/images/home/creative/creative_img_4.png",
    name: "Darko Stanković",
    position: "UI Designer",
    twitterLink: "https://x.com/",
    linkedinLink: "https://in.linkedin.com/",
  },
];

const WebResultTagList: WebResultTag[] = [
  {
    image: "/images/home/result/creativity.svg",
    name: "Creativity",
    bg_color: "bg-purple/20",
    txt_color: "text-purple",
  },
  {
    image: "/images/home/result/innovation.svg",
    name: "Innovation",
    bg_color: "bg-blue/20",
    txt_color: "text-blue",
  },
  {
    image: "/images/home/result/strategy.svg",
    name: "Strategy",
    bg_color: "bg-orange/20",
    txt_color: "text-orange",
  },
];

const faqList: faq[] = [
  {
    faq_que: "What services does Wayber Agency offer?",
    faq_ans:
      "Yes, we provide post-launch support to ensure smooth implementation and offer ongoing maintenance packages for clients needing regular updates or technical assistance.",
  },
  {
    faq_que: "How long does a typical project take?",
    faq_ans:
      "Yes, we provide post-launch support to ensure smooth implementation and offer ongoing maintenance packages for clients needing regular updates or technical assistance.",
  },
  {
    faq_que: "How is pricing structured at Wayber Agency?",
    faq_ans:
      "Yes, we provide post-launch support to ensure smooth implementation and offer ongoing maintenance packages for clients needing regular updates or technical assistance.",
  },
  {
    faq_que: "Do you offer ongoing support after project completion?",
    faq_ans:
      "Yes, we provide post-launch support to ensure smooth implementation and offer ongoing maintenance packages for clients needing regular updates or technical assistance.",
  },
  {
    faq_que: "How often will I receive updates on my project?",
    faq_ans:
      "Yes, we provide post-launch support to ensure smooth implementation and offer ongoing maintenance packages for clients needing regular updates or technical assistance.",
  },
  {
    faq_que: "How often will I receive updates on my project?",
    faq_ans:
      "Yes, we provide post-launch support to ensure smooth implementation and offer ongoing maintenance packages for clients needing regular updates or technical assistance.",
  },
];

export const GET = async () => {
  return NextResponse.json({
    avatarList,
    brandList,
    innovationList,
    onlinePresenceList,
    creativeMindList,
    WebResultTagList,
    faqList,
  });
};
