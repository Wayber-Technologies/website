import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wayber Technologies - Web & Mobile App Development Agency",
  description:
    "Wayber Technologies is a premier digital agency specializing in custom web development, mobile app creation, UI/UX design, and strategic digital marketing. We build innovative solutions to elevate your business.",
  keywords:
    "custom web development, web development agency, mobile app development company, UI/UX design services, digital marketing agency, software development services, web design and development, app design and development, digital transformation solutions, business growth strategies, React development, Next.js development, iOS app development, Android app development, user experience design, user interface design, SEO services, content marketing, social media marketing, e-commerce development, full-stack development, front-end development, back-end development",
  authors: [{ name: "Wayber Technologies" }],
  creator: "Wayber Technologies",
  publisher: "Wayber Technologies",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://waybertechnologies.com",
    siteName: "Wayber Technologies",
    title: "Wayber Technologies - Digital Agency & Web Development Services",
    description:
      "Leading digital agency specializing in web development, mobile apps, UI/UX design, and digital marketing. Transform your business with innovative solutions.",
    images: [
      {
        url: "https://waybertechnologies.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Wayber Technologies - Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@waybertech",
    creator: "@waybertech",
    title: "Wayber Technologies - Digital Agency & Web Development Services",
    description:
      "Leading digital agency specializing in web development, mobile apps, UI/UX design, and digital marketing.",
    images: ["https://waybertechnologies.com/images/twitter-card.jpg"],
  },
  alternates: {
    canonical: "https://waybertechnologies.com",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
};