// Content for the Services, About and Contact pages.
// Sources: the live site (waybertechnologies.com), the Figma brand guide
// and the original repo copy. Lines marked TODO(content) need confirming.

export type Service = {
  number: string;
  title: string;
  body: string;
  examples: string[];
  caseStudy?: { label: string; href: string };
};

export const SERVICES: Service[] = [
  {
    number: "01",
    title: "Web platforms",
    body: "Customer portals, dashboards and internal tools built for real traffic and real data, on a stack your team can maintain after we hand over.",
    examples: ["Customer portals and dashboards", "Back-office and internal tools", "APIs and third-party integrations"],
    caseStudy: { label: "See Sise", href: "/case/sise" },
  },
  {
    number: "02",
    title: "Mobile apps",
    body: "Native iOS and Android apps, or one Flutter codebase for both. We take them from first sketch to the App Store and Play Store, and through every update after.",
    examples: ["Consumer apps", "Event and community apps", "Store launch and release management"],
    caseStudy: { label: "See Run For The Future", href: "/case/rftf" },
  },
  {
    number: "03",
    title: "Fintech & systems",
    body: "Wallets, exchanges and investment products, with the security, audit and compliance work that regulated money needs.",
    examples: ["Wallets and payments", "Trading and investment products", "Security reviews and hardening"],
    caseStudy: { label: "See Mallam X", href: "/case/mallamx" },
  },
  {
    number: "04",
    title: "Product & UI/UX design",
    body: "Research, user flows and interfaces that people understand without a manual, handed to engineering as a design system rather than a pile of screens.",
    examples: ["Discovery and user research", "Flows and clickable prototypes", "Interface design and design systems"],
  },
  {
    number: "05",
    title: "Consultancy & audits",
    body: "A second pair of eyes on what you already run: architecture, code quality, security and compliance, with a plan you can act on.",
    examples: ["Architecture and code reviews", "Security and compliance audits", "Technology roadmaps"],
  },
  {
    number: "06",
    title: "Analytics & reporting",
    body: "Dashboards and reports that answer the question your team actually asks, built on data you can trust.",
    examples: ["Product and business dashboards", "Data pipelines and tracking", "Reporting automation"],
  },
  {
    number: "07",
    title: "Brand & growth",
    body: "Positioning, launch assets and digital marketing for the products we build, so the launch gets the attention the work deserves.",
    examples: ["Brand strategy and identity", "Launch campaigns", "Digital marketing"],
  },
];

export const PROCESS = [
  {
    number: "01",
    title: "Foundation",
    body: "We learn your goals, your users and your context, and find the real problem rather than the symptom.",
  },
  {
    number: "02",
    title: "Blueprint",
    body: "A roadmap with milestones, the architecture and the design, planned for security, speed and scale.",
  },
  {
    number: "03",
    title: "Build",
    body: "Engineering in milestones you can see and test, reviewed and tested before anything ships.",
  },
  {
    number: "04",
    title: "Support",
    body: "Launch, then ongoing support. We keep your systems healthy, secure and ready for what comes next.",
  },
];

export const ALONGSIDE = [
  {
    when: "During development",
    body: "We simplify choices, explain the trade-offs and adapt quickly when your needs change.",
  },
  {
    when: "At launch",
    body: "We help you switch over smoothly, keep downtime low and get your team comfortable with the new system.",
  },
  {
    when: "After delivery",
    body: "We stay close, supporting, optimising and securing your systems as you scale.",
  },
];

export const STACK = [
  "Figma",
  "Laravel",
  "PHP",
  "Python",
  "Vue.js",
  "Flutter",
  "Dart",
  "Swift",
  "Kotlin",
  "Java",
  "Objective-C",
  "Webflow",
];

// From the Figma brand guide: the icon is W (Way) + B (Better) + layers of technology.
// Shown as the brand guide's equation: W + B + layers = the mark.
export const MARK_MEANING: { glyph: "W" | "B" | "layers"; word: string; body: string }[] = [
  { glyph: "W", word: "Way", body: "From an idea to a product people use." },
  { glyph: "B", word: "Better", body: "Every release leaves it better than before." },
  { glyph: "layers", word: "Layers", body: "Technology built to stack and hold." },
];

// From the brand guide letterhead: "competence, strong relationships, and futuristic thinking".
export const VALUES = [
  {
    title: "Competence",
    body: "We say what we can do, then do it properly. If something isn’t right for us, we will tell you and point you to someone who can help.",
  },
  {
    title: "Strong relationships",
    body: "You work with the people building your product, not a relay. Most of our work comes from teams who stay with us after launch.",
  },
  {
    title: "Futuristic thinking",
    body: "We build for where you are going, not only where you are, so the first version doesn’t have to be thrown away to make the second.",
  },
];

// TODO(content): add photos and the rest of the team.
export const LEADERSHIP = [{ name: "Riliwan Balogun", role: "CEO & Co-Founder" }];

export const INTERESTS = [
  "Web platform",
  "Mobile app",
  "Fintech product",
  "Product & UI/UX design",
  "Consultancy or audit",
  "Analytics & reporting",
  "Brand & growth",
  "Something else",
];

// Budget bands from the live contact form.
export const BUDGETS = ["Small scale", "Large scale", "Not sure yet"];

// TODO(content): these answers are drafts. Confirm timelines, pricing and update cadence.
export const FAQ = [
  {
    q: "What services do you offer?",
    a: "Web platforms, mobile apps, fintech products, product and UI/UX design, consultancy and audits, analytics and reporting, and brand and growth work for what we build.",
  },
  {
    q: "How long does a typical project take?",
    a: "It depends on scope. A focused first version takes weeks; a full platform takes months. After our first conversation you get a timeline broken into milestones you can hold us to.",
  },
  {
    q: "How is pricing structured?",
    a: "We price each project after scoping it, with payments tied to milestones. For ongoing work after launch we agree a monthly support arrangement.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Yes. We stay after delivery to support, optimise and secure what we built, and we can take over systems built by someone else after an audit.",
  },
  {
    q: "How often will I hear from you?",
    a: "Regularly. You get progress updates throughout the build and a working demo at every milestone, and you can always talk to the people doing the work.",
  },
  {
    q: "What makes Wayber different?",
    a: "Strategy, design and engineering sit in one team, so nothing gets lost between the person who scoped your product and the person who ships it. And we don’t disappear after launch.",
  },
];
