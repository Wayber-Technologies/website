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
    title: "Web platforms",
    body: "Dashboards, client portals and internal tools. Sise puts a sales team’s pipeline value, lead statuses and hand-offs on one screen.",
    linkLabel: "See Sise",
    href: "/case/sise",
    image: { src: "/sise1.png", alt: "Sise workflow platform artwork", fit: "cover", position: "center top", background: "#DCEBFF" },
    tone: "light",
  },
  {
    title: "Mobile apps",
    body: "Flutter and native apps for iOS and Android. For ARM Pensions we built run tracking, leaderboards and event sign-up.",
    linkLabel: "See RFTF",
    href: "/case/rftf",
    image: { src: "/rftf2.png", alt: "Four screens from the Run For The Future mobile app", fit: "contain", background: "#E5E5E5" },
    tone: "light",
    mediaFirst: true,
  },
  {
    title: "Fintech & systems",
    body: "Wallets, currency exchange and investment products. Mallam X holds and swaps naira, dollars and pounds in one balance. CPCompass adds identity checks, Paystack funding and audit logs for a regulated asset manager.",
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
  /** `background` fills the card below the image: match the image's bottom edge (any CSS background). */
  image: { src: string; alt: string; background: string; fit: "cover" | "contain" };
};

export const FEATURED_WORK: FeaturedWork[] = [
  {
    title: "Sise",
    sector: "Workflow & CRM",
    summary: "Lead and customer management: pipeline, statuses and hand-offs on one dashboard.",
    href: "/case/sise",
    image: { src: "/project1.png", alt: "Sise logo on a light blue field", background: "#D1ECFC", fit: "cover" },
  },
  {
    title: "Run For The Future",
    sector: "Wellness · ARM Pensions",
    summary: "Runs, leaderboards and events for ARM’s seventh awareness campaign.",
    href: "/case/rftf",
    image: { src: "/project3.png", alt: "Run For The Future campaign artwork", background: "#4D2544", fit: "cover" },
  },
  {
    title: "CPCompass",
    sector: "Investment · Comercio Partners",
    summary: "Goal-based saving and investing on web, iOS and Android.",
    href: "/case/cpcompass",
    image: { src: "/work/cpcompass-aspire.jpg", alt: "CPCompass Aspire Goals", background: "linear-gradient(90deg, #3B4080, #53386F)", fit: "cover" },
  },
];

export const CLIENTS = ["Comercio Partners", "ARM", "City Distro", "Richardson Oil & Gas"];
