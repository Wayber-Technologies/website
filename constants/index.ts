import { eshuis, haafkes, hartman, pentuin, saion, stewards, project1, project2, project3, project4 } from "@/public";

export const links = [
  {
    id: 1,
    title: "Our ambition",
    href: "our-ambition",
  },
  {
    id: 2,
    title: "What we do",
    href: "what-we-do",
  },
  {
    id: 3,
    title: "Transformation",
    href: "transformation",
  },
  {
    id: 4,
    title: "Our impact",
    href: "our-impact",
  },
  {
    id: 5,
    title: "Get in touch",
    href: "get-in-touch",
  },
];

export const collaborationItems = [
  {
    id: 1,
    src: saion,
  },
  {
    id: 2,
    src: haafkes,
  },
  {
    id: 3,
    src: pentuin,
  },
  {
    id: 4,
    src: eshuis,
  },
  {
    id: 5,
    src: hartman,
  },
  {
    id: 6,
    src: stewards,
  },
];

export const projectItem = [
  {
    id: 1,
    title: "SISE",
    href: "/case/",
    src: project1,
    links: [
      {
        id: 1,
        title: "audit",
        href: "/services",
      },
      {
        id: 2,
        title: "copywriting",
        href: "/services",
      },
      {
        id: 3,
        title: "sales deck",
        href: "/services",
      },
      {
        id: 4,
        title: "slides design",
        href: "/services",
      },
    ],
  },
  {
    id: 2,
    title: "MALLAM-X",
    href: "/case/",
    src: project2,
    links: [
      {
        id: 1,
        title: "agency",
        href: "/services",
      },
      {
        id: 2,
        title: "compony presentation",
        href: "/services",
      },
    ],
  },
  {
    id: 3,
    title: "COMERCIO",
    href: "/case/",
    src: project3,
    links: [
      {
        id: 1,
        title: "brand identity",
        href: "/services",
      },
      {
        id: 2,
        title: "design research",
        href: "/services",
      },
      {
        id: 3,
        title: "investor deck",
        href: "/services",
      },
    ],
  },
  {
    id: 4,
    title: "RFTF",
    href: "/case/",
    src: project4,
    links: [
      {
        id: 1,
        title: "brand template",
        href: "/services",
      },
    ],
  },
];
