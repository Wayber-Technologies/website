import './globals.css';
import type { Metadata } from 'next';
import { Figtree, Instrument_Serif } from 'next/font/google';

const figtree = Figtree({ subsets: ['latin'] });
const instrumentSerif = Instrument_Serif({ 
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic']
});

export const metadata: Metadata = {
  title: 'Wayber Technologies - Digital Agency & Web Development Services',
  description: 'Wayber Technologies is a leading digital agency specializing in web development, mobile apps, UI/UX design, and digital marketing. We help businesses transform their digital presence with innovative solutions.',
  keywords: 'digital agency, web development, mobile app development, UI/UX design, digital marketing, software development, web design, app development, digital transformation, business solutions',
  authors: [{ name: 'Wayber Technologies' }],
  creator: 'Wayber Technologies',
  publisher: 'Wayber Technologies',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://waybertechnologies.com',
    siteName: 'Wayber Technologies',
    title: 'Wayber Technologies - Digital Agency & Web Development Services',
    description: 'Leading digital agency specializing in web development, mobile apps, UI/UX design, and digital marketing. Transform your business with innovative solutions.',
    images: [
      {
        url: 'https://waybertechnologies.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Wayber Technologies - Digital Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@waybertech',
    creator: '@waybertech',
    title: 'Wayber Technologies - Digital Agency & Web Development Services',
    description: 'Leading digital agency specializing in web development, mobile apps, UI/UX design, and digital marketing.',
    images: ['https://waybertechnologies.com/images/twitter-card.jpg'],
  },
  alternates: {
    canonical: 'https://waybertechnologies.com',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/aloevera/Aloevera-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/aloevera/Aloevera-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Wayber Technologies" />
        <link rel="apple-touch-icon" href="/images/Wayber Icon.svg" />
        <link rel="icon" type="image/svg+xml" href="/images/Wayber Icon.svg" />
        <link rel="shortcut icon" href="/images/Wayber Icon.svg" />
        <link rel="icon" sizes="16x16" href="/images/Wayber Icon.svg" />
        <link rel="icon" sizes="32x32" href="/images/Wayber Icon.svg" />
        <link rel="icon" sizes="192x192" href="/images/Wayber Icon.svg" />
        <link rel="icon" sizes="512x512" href="/images/Wayber Icon.svg" />
      </head>
      <body className={`${figtree.className} ${instrumentSerif.className}`}>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Wayber Technologies",
              "url": "https://waybertechnologies.com",
              "logo": "https://waybertechnologies.com/images/Wayber Logo.svg",
              "description": "Leading digital agency specializing in web development, mobile apps, UI/UX design, and digital marketing. We help businesses transform their digital presence with innovative solutions.",
              "foundingDate": "2020",
              "founders": [
                {
                  "@type": "Person",
                  "name": "Wayber Technologies Team"
                }
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-XXX-XXX-XXXX",
                "contactType": "customer service",
                "email": "office@waybertechnologies.com"
              },
              "sameAs": [
                "https://twitter.com/waybertech",
                "https://linkedin.com/company/wayber-technologies",
                "https://github.com/wayber-technologies"
              ],
              "service": [
                {
                  "@type": "Service",
                  "name": "Web Development",
                  "description": "Custom web development services using modern technologies"
                },
                {
                  "@type": "Service", 
                  "name": "Mobile App Development",
                  "description": "iOS and Android mobile application development"
                },
                {
                  "@type": "Service",
                  "name": "UI/UX Design", 
                  "description": "User interface and user experience design services"
                },
                {
                  "@type": "Service",
                  "name": "Digital Marketing",
                  "description": "Comprehensive digital marketing strategies and implementation"
                }
              ],
              "areaServed": {
                "@type": "Country",
                "name": "United States"
              }
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
