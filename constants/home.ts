// Content for the redesigned homepage. Everything here comes from the live
// site (waybertechnologies.com) or the case-study material already in this repo.

export const CONTACT = {
  officeEmail: "office@waybertechnologies.com",
  technologyEmail: "technology@waybertechnologies.com",
  phoneDisplay: "+234 808 061 2291",
  phoneHref: "tel:+2348080612291",
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

// Logos from each client's own website (public/clients/). `display` is the
// display height in px, tuned per logo so they look the same size.
export const CLIENTS = [
  { name: "Comercio Partners", logo: "/clients/comercio-partners.png", width: 503, height: 154, display: 34 },
  { name: "ARM", logo: "/clients/arm.png", width: 469, height: 140, display: 30 },
  { name: "City Distro", logo: "/clients/city-distro.svg", width: 154, height: 28, display: 26 },
  { name: "Richardson Oil & Gas", logo: "/clients/richardson.png", width: 737, height: 175, display: 34 },
  { name: "TradeFi", logo: "/clients/tradefi.png", width: 141, height: 45, display: 32 },
  { name: "PostOff", logo: "/clients/postoff.png", width: 330, height: 92, display: 28 },
];

/**
 * How a project runs (the "From idea to launch" section): one photo card per
 * step, with the step's text over the photo. `position` is the photo's
 * object-position, to keep the people in frame in a tall crop.
 *
 * Photos (Unsplash License, public/home/process-*-v3.jpg), all from
 * Christina @ wocintechchat.com:
 * - process-plan: unsplash.com/photos/Q8IgAlmHAUA
 * - process-build: unsplash.com/photos/bVya-9G7iDg
 * - process-launch: unsplash.com/photos/dFCOgR91H5M
 */
export type ProcessStep = {
  title: string;
  body: string;
  image: string;
  alt: string;
  position?: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    title: "Plan",
    body: "Tell us what you're building and who it's for. We map the features, choose the stack and agree a timeline and a cost before any work starts.",
    image: "/home/process-plan-v3.jpg",
    alt: "A woman mapping out a product plan on a glass wall of notes",
    position: "28% center",
  },
  {
    title: "Build",
    body: "User flows and a clickable prototype first, then regular releases to a staging link, with automated tests and a review at each step.",
    image: "/home/process-build-v3.jpg",
    alt: "A developer in a red hoodie working on a laptop in a dark room",
    position: "50% center",
  },
  {
    title: "Launch",
    body: "We ship to the web and the app stores, then stay on to monitor, fix and keep improving it.",
    image: "/home/process-launch-v3.jpg",
    alt: "A woman with her laptop by a high window over the city",
    position: "68% center",
  },
];
