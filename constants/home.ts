// Content for the redesigned homepage. Everything here comes from the live
// site (waybertechnologies.com) or the case-study material already in this repo.

export const CONTACT = {
  officeEmail: "office@waybertechnologies.com",
  technologyEmail: "technology@waybertechnologies.com",
  phoneDisplay: "+234 808 061 2291",
  phoneHref: "tel:+2348080612291",
  address: "39b Ondo Street, Lagos, Nigeria",
};

export const SOCIAL = [
  { label: "GitHub", href: "https://github.com/wayber-technologies" },
  { label: "X", href: "https://x.com/wayber" },
  { label: "Journal on Medium", href: "https://medium.com/@waybertechnologies" },
];

export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "https://medium.com/@waybertechnologies" },
];

export const STUDIO_PHOTOS = [
  { src: "/home/photo-team-laptop.jpg", alt: "Team gathered around a laptop, reviewing a build", position: "center" },
  { src: "/home/photo-whiteboard.jpg", alt: "Team mapping a system on a whiteboard", position: "center" },
  { src: "/home/photo-dev.jpg", alt: "Engineer focused on code", position: "65% center" },
];

export type Capability = {
  number: string;
  title: string;
  body: string;
  linkLabel: string;
  href: string;
  image: { src: string; alt: string; fit: "cover" | "contain"; position?: string; background: string };
  tone: "light" | "dark";
  mediaFirst?: boolean;
};

export const CAPABILITIES: Capability[] = [
  {
    number: "01",
    title: "Web platforms",
    body: "Dashboards, portals and internal tools built for real traffic and real data. Laravel, Python and Vue, shipped in milestones you can see.",
    linkLabel: "See Sise",
    href: "/case/sise",
    image: { src: "/sise1.png", alt: "Sise workflow platform artwork", fit: "cover", position: "center top", background: "#DCEBFF" },
    tone: "light",
  },
  {
    number: "02",
    title: "Mobile apps",
    body: "Native and Flutter apps for iOS and Android, from first sketch to the store and every update after.",
    linkLabel: "See RFTF",
    href: "/case/rftf",
    image: { src: "/rftf2.png", alt: "Four screens from the Run For The Future mobile app", fit: "contain", background: "#FFFFFF" },
    tone: "light",
    mediaFirst: true,
  },
  {
    number: "03",
    title: "Fintech & systems",
    body: "Wallets, exchanges and investment products, with the audits, security and compliance work regulated money needs.",
    linkLabel: "See Mallam X",
    href: "/case/mallamx",
    image: { src: "/malamx2.png", alt: "Mallam X e-wallet dashboard", fit: "cover", position: "left center", background: "#EEF5EC" },
    tone: "dark",
  },
];

export const OTHER_SERVICES = ["Product & UI/UX design", "Consultancy & audits", "Analytics & reporting", "Brand & growth"];

export type FeaturedWork = {
  title: string;
  sector: string;
  summary: string;
  href: string;
  image: { src: string; alt: string; background: string; fit: "cover" | "contain" };
};

export const FEATURED_WORK: FeaturedWork[] = [
  {
    title: "Sise",
    sector: "Workflow & CRM",
    summary: "Lead and customer management for teams who live in their pipeline.",
    href: "/case/sise",
    image: { src: "/project1.png", alt: "Sise logo on a light blue field", background: "#DCEBFF", fit: "cover" },
  },
  {
    title: "Run For The Future",
    sector: "Wellness · ARM Pensions",
    summary: "Runs, leaderboards and events for ARM’s seventh awareness campaign.",
    href: "/case/rftf",
    image: { src: "/project3.png", alt: "Run For The Future campaign artwork", background: "#4A1F3D", fit: "cover" },
  },
  {
    title: "CPCompass",
    sector: "Investment · Comercio Partners",
    summary: "Goal-based saving and investing on web, iOS and Android.",
    href: "/case/cpcompass",
    image: { src: "/work/cpcompass-aspire.jpg", alt: "CPCompass Aspire Goals", background: "#3B4180", fit: "cover" },
  },
];

export const CLIENTS = ["Comercio Partners", "ARM", "City Distro", "Richardson Oil & Gas"];
