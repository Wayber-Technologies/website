import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wayber Technologies - Digital Agency & Web Development Services",
  description:
    "Wayber Technologies is a leading digital agency specializing in web development, mobile apps, UI/UX design, and digital marketing. We help businesses transform their digital presence with innovative solutions.",
  keywords:
    "digital agency, web development, mobile app development, UI/UX design, digital marketing, software development, web design, app development, digital transformation, business solutions",
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