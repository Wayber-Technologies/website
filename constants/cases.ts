import type { StaticImageData } from "next/image";
import {
  sise1, sise2, sise3, sise4, sise5,
  malamx2, malamx3, malamx4, malamx5,
  rftf2, rftf3, rftf4,
  burnout2, burnout3, burnout4, burnout5,
  project1, project3, project4,
} from "@/public";
import cpcompassPhones from "@/public/work/cpcompass-phones.png";
import cpcompassAspire from "@/public/work/cpcompass-aspire.jpg";
import wesleepCover from "@/public/work/wesleep-cover.jpg";
import wesleepMarket from "@/public/work/wesleep-market.jpg";
import wesleepRanks from "@/public/work/wesleep-ranks.jpg";
import postoffCard from "@/public/work/postoff-card.jpg";
import postoffCover from "@/public/work/postoff-cover.jpg";
import postoffFlow from "@/public/work/postoff-flow.jpg";

// Case studies for the redesigned /work and /case/[slug] pages. The copy is
// rewritten from the original case data in constants/index.ts. Unverified
// numbers ("50+ people" and so on) were left out on purpose.

export type CaseImage = {
  src: StaticImageData;
  alt: string;
  /** "cover" fills the frame; "contain" shows the whole screenshot on the frame colour. */
  fit: "cover" | "contain";
  background: string;
};

export type GalleryItem = CaseImage & { span: "full" | "half" };

export type CaseStudy = {
  slug: string;
  title: string;
  client?: string;
  sector: string;
  platform: string;
  services: string[];
  summary: string;
  overview: string;
  challenge: string;
  approach: string;
  outcome: string;
  card: CaseImage;
  cover: CaseImage;
  gallery: GalleryItem[];
};

export const CASES: CaseStudy[] = [
  {
    // Facts from the live product (app.cpcompass.ng, cpcompass.ng) and its codebases
    // (cp-customer, cp-mobile, cp-admin, cp-api). Images are the team's own public marketing assets.
    slug: "cpcompass",
    title: "CPCompass",
    client: "Comercio Partners Asset Management",
    sector: "Investment",
    platform: "Web, iOS & Android",
    services: ["Product design", "Web app", "Flutter mobile app", "Admin & APIs"],
    summary: "Goal-based saving and investing: set a goal, pick a plan, and watch your money work toward it.",
    overview:
      "CPCompass helps everyday Nigerians save and invest toward the things they care about: an emergency fund, a home, school fees, travel or retirement. Users fund a wallet, choose a plan, and track every naira in one portfolio.",
    challenge:
      "Make professional asset management feel personal and approachable, while meeting the identity checks, security and record-keeping a regulated asset manager needs.",
    approach:
      "We built the whole platform: the web app at app.cpcompass.ng and a Flutter app for iOS and Android, on our own API. Users verify their identity (with OTP, and manual review as a fallback), take a risk-profile questionnaire, fund their wallet through Paystack, and invest from a marketplace of three products: Snappy Investments for two-click flexible-term saving, Aspire Goals for custom targets, and Flash Deals for time-limited offers like commercial papers and bonds. An admin dashboard, audit logging and SMS alerts run the operation behind it.",
    outcome:
      "CPCompass is live on the web, the App Store and Google Play, with a portfolio view, an investment calculator, personal finance insights and in-app support.",
    card: { src: cpcompassAspire, alt: "CPCompass Aspire Goals", fit: "cover", background: "#3B4180" },
    cover: { src: cpcompassPhones, alt: "CPCompass home screen and app store listing on two phones", fit: "contain", background: "#EEF0F7" },
    gallery: [],
  },
  {
    slug: "sise",
    title: "Sise",
    sector: "Workflow & CRM",
    platform: "Web app",
    services: ["Product design", "Dashboard & data viz", "Web development", "Workflow automation"],
    summary: "Lead and customer management for teams who live in their pipeline.",
    overview:
      "Sise is a lead and customer management platform. One dashboard shows pipeline value, lead status and customer numbers in real time, so a sales team always knows where each deal stands.",
    challenge:
      "Sales data is messy and it never stops coming in. The product had to handle a lot of it without burying people in numbers, and make the next action obvious from any screen.",
    approach:
      "We built Sise around the pipeline: custom filters, clear lead statuses and automated hand-offs between stages. Sign-up and onboarding were designed to get a team into its own data in minutes.",
    outcome:
      "Teams use Sise to watch their pipeline and make decisions from live data instead of a spreadsheet passed around on email.",
    card: { src: project1, alt: "Sise logo on a light blue field", fit: "cover", background: "#DCEBFF" },
    cover: { src: sise1, alt: "Sise brand artwork: Work meets flow", fit: "contain", background: "#DCEBFF" },
    gallery: [
      { src: sise5, alt: "Sise leads table with filters and status tags", fit: "contain", background: "#EEF3FB", span: "full" },
      { src: sise4, alt: "Sise dashboard with pipeline value and recent activity", fit: "contain", background: "#EEF3FB", span: "half" },
      { src: sise2, alt: "Sise sign-up screen", fit: "contain", background: "#DCEBFF", span: "half" },
      { src: sise3, alt: "Sise welcome and log-in screens", fit: "contain", background: "#F3F5F8", span: "full" },
    ],
  },
  {
    slug: "mallamx",
    title: "Mallam X",
    sector: "Fintech",
    platform: "Web & mobile",
    services: ["Product design", "E-wallet", "Currency exchange", "Security"],
    summary: "An e-wallet for swapping naira, dollars and pounds without the bank queue.",
    overview:
      "Mallam X is a digital currency exchange built on an e-wallet. People hold and swap NGN, USD and GBP, and track Bitcoin, Ethereum and XRP, from desktop or phone.",
    challenge:
      "Money apps live or die on trust. Moving between currencies had to feel as simple as sending a message, without ever hiding what is happening to someone’s money.",
    approach:
      "One combined wallet balance, tap-to-act buttons for buy, sell, send and receive, and live price tracking. The interface works the same way on desktop and mobile, with sharing built in for person-to-person payments.",
    outcome:
      "One place to manage several currencies and crypto assets, with every transaction one clear step away.",
    card: { src: malamx2, alt: "Mallam X wallet dashboard", fit: "contain", background: "#EEF5EC" },
    cover: { src: malamx2, alt: "Mallam X wallet dashboard on desktop and mobile", fit: "contain", background: "#EEF5EC" },
    gallery: [
      { src: malamx3, alt: "Mallam X trade screen with price chart", fit: "contain", background: "#EEF5EC", span: "full" },
      { src: malamx4, alt: "Mallam X crypto portfolio overview", fit: "contain", background: "#F3F5F8", span: "half" },
      { src: malamx5, alt: "Mallam X transactions view", fit: "contain", background: "#F3F5F8", span: "half" },
    ],
  },
  {
    slug: "rftf",
    title: "Run For The Future",
    client: "ARM Pensions",
    sector: "Wellness",
    platform: "Mobile app",
    services: ["Product design", "Mobile development", "Event management", "Community features"],
    summary: "Runs, leaderboards and events for ARM Pensions’ seventh Run For The Future campaign.",
    overview:
      "Run For The Future is a fitness and community app for ARM Pensions’ awareness campaign. Clients and the public sign up, track runs and walks, and take part in events together.",
    challenge:
      "A pensions company asking people to go running. The app had to feel energetic and genuine while staying true to ARM’s professional brand.",
    approach:
      "Run tracking, leaderboards, profiles and full event details in one app. Bold imagery and a maroon and neutral palette sit comfortably alongside ARM’s own identity.",
    outcome:
      "A complete event experience that turns a campaign into a community, from sign-up to the finish line.",
    card: { src: project3, alt: "Run For The Future campaign artwork", fit: "cover", background: "#4A1F3D" },
    cover: { src: project3, alt: "Run For The Future campaign artwork: a runner on maroon", fit: "cover", background: "#4A1F3D" },
    gallery: [
      { src: rftf2, alt: "Onboarding and sign-up screens", fit: "contain", background: "#F6F1F4", span: "full" },
      { src: rftf4, alt: "Run tracking and progress screens", fit: "contain", background: "#F3F5F8", span: "full" },
      { src: rftf3, alt: "Profile set-up and selfie capture screens", fit: "contain", background: "#F6F1F4", span: "full" },
    ],
  },
  {
    // TODO(content): Burnout is not on the live site. Confirm it should be shown.
    slug: "burnout",
    title: "Burnout",
    sector: "People & HR",
    platform: "Web app",
    services: ["Product design", "Web development", "Wellness tracking", "Performance metrics"],
    summary: "Team management that spots burnout before it costs you people.",
    overview:
      "Burnout combines performance tracking with wellness monitoring, so team leads can see who is overloaded before productivity starts to drop.",
    challenge:
      "Tracking wellbeing at work can easily feel like surveillance. The system had to surface burnout patterns without adding stress for the people being measured.",
    approach:
      "Colour-coded team health, points, task assignments and completion rates, in a calm black, white and cyan interface that keeps the focus on people, not scores.",
    outcome:
      "Team leads get an early warning system, and healthy work patterns become something the product rewards.",
    card: { src: project4, alt: "Burnout logo", fit: "cover", background: "#F7F7F7" },
    cover: { src: burnout3, alt: "Burnout team members view with health scores", fit: "contain", background: "#F3F5F8" },
    gallery: [
      { src: burnout2, alt: "Burnout team lead dashboard", fit: "contain", background: "#EAF7F9", span: "half" },
      { src: burnout4, alt: "Burnout points leaderboard", fit: "contain", background: "#F3F5F8", span: "half" },
      { src: burnout5, alt: "Burnout employee directory", fit: "contain", background: "#F3F5F8", span: "full" },
    ],
  },
  {
    // Facts from the product page at devsolutely.com/projects/wesleep (copy rewritten).
    // TODO(content): confirm launch status; the source says the beta is in preparation.
    slug: "wesleep",
    title: "WeSleep",
    sector: "Web3 & wellness",
    platform: "iOS & Android",
    services: ["Product design", "Mobile development", "NFT marketplace", "In-app wallet"],
    summary: "A sleep-to-earn app that rewards rest with tokens and nudges people toward healthier routines.",
    overview:
      "WeSleep is a Web3 app with game-like rewards for sleep. People hold a Sleepie NFT, sleep, and earn $ZZZ tokens. Each Sleepie’s traits (fatigue, drowsiness, luck and devotion) set how much it can earn in a day.",
    challenge:
      "Blend crypto mechanics with a health habit without letting either feel like a chore. Rewards had to be fair and hard to game, and the wallet and marketplace simple enough for people new to Web3.",
    approach:
      "An iOS and Android app that reads health, GPS and motion data to check activity and work out rewards. Around it: an NFT marketplace to level up, breed and trade Sleepies, an in-app wallet to swap rewards and send $WEZ and $ZZZ, and daily tasks with leaderboards.",
    outcome:
      "The core loop is in place (sleep, earn, level up, compete) and the product is heading into beta, with health tracking that also suggests ways to live a more active life.",
    card: { src: wesleepCover, alt: "WeSleep marketplace, Sleepie and leaderboard screens", fit: "cover", background: "#1C1F26" },
    cover: { src: wesleepCover, alt: "Three phones showing the WeSleep marketplace, a Sleepie and the leaderboard", fit: "cover", background: "#1C1F26" },
    gallery: [
      { src: wesleepMarket, alt: "Sleepie marketplace with traits and prices", fit: "contain", background: "#1C1F26", span: "half" },
      { src: wesleepRanks, alt: "Regional leaderboard", fit: "contain", background: "#1C1F26", span: "half" },
    ],
  },
  {
    // Facts from postoff.co (rendered 2026-11-16) and the PostOff mobile app designs in Figma.
    // The site's "10,000+ trusted Envoys" figure is left out: unverified, and the app is pre-launch.
    // TODO(content): confirm Wayber's scope (design only, or design and build) and launch status.
    slug: "postoff",
    title: "PostOff",
    client: "PostOff Technologies",
    sector: "Logistics",
    platform: "iOS & Android",
    services: ["Product design", "Mobile app", "KYC & verification", "Escrow payments"],
    summary: "Peer-to-peer delivery: send parcels with verified Envoys already travelling your route.",
    overview:
      "PostOff is a decentralised logistics network for Nigeria. Senders book a delivery, and the app matches them with a verified Envoy (someone already heading that way by car, motorcycle, bicycle or public transport) for local or interstate drops. Fleet owners can register their vehicles and manage deliveries on the same platform.",
    challenge:
      "Handing a parcel to a stranger only works if every step feels safe. Envoys had to be properly vetted, payment had to wait until the parcel arrived, and sender, Envoy and receiver had to stay in touch without sharing phone numbers.",
    approach:
      "One app for Senders and Envoys. Booking starts on a live map: choose local or interstate, pick the transport types you’re happy with, and fill in the route. Envoys go through layered KYC (BVN, NIN, driver’s licence and a live liveness check) before they can take a job. The fee sits in an escrow wallet and is only released when the receiver hands over a one-time code. Masked chat and calls connect sender and Envoy, a tracking link lets the receiver follow the delivery, and Envoys see pending escrow payments and their earnings history.",
    outcome:
      "PostOff is preparing to launch on iOS and Android, with a waitlist open for Senders and Envoys at postoff.co.",
    card: { src: postoffCard, alt: "PostOff welcome, booking and escrow screens on orange", fit: "cover", background: "#FF5C1F" },
    cover: { src: postoffCover, alt: "Three PostOff screens: welcome, local delivery booking on a map, and pending escrow payments", fit: "cover", background: "#FF5C1F" },
    gallery: [
      { src: postoffFlow, alt: "PostOff chat with an Envoy, receiver tracking link, Envoy verification submitted, and Envoy earnings", fit: "contain", background: "#FEEFEA", span: "full" },
    ],
  },
];

export const getCase = (slug: string) => CASES.find((c) => c.slug === slug);

export const getNextCase = (slug: string) => {
  const i = CASES.findIndex((c) => c.slug === slug);
  return CASES[(i + 1) % CASES.length];
};
