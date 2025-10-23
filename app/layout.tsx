import { Figtree, Instrument_Serif } from "next/font/google";
import { metadata } from "./metadata";
import ClientLayout from "./client-layout";
import "./globals.css";

const figtree = Figtree({ subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});
export { metadata };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Wayber Technologies" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" sizes="16x16" href="/favicon.ico" />
        <link rel="icon" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" sizes="192x192" href="/favicon.ico" />
        <link rel="icon" sizes="512x512" href="/favicon.ico" />

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-WGV8Q0QK8T"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WGV8Q0QK8T', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `,
          }}
        />
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
              "description":
                "Leading digital agency specializing in web development, mobile apps, UI/UX design, and digital marketing. We help businesses transform their digital presence with innovative solutions.",
              "foundingDate": "2020",
              "founders": [
                {
                  "@type": "Person",
                  "name": "Wayber Technologies Team",
                },
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US",
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-XXX-XXX-XXXX",
                "contactType": "customer service",
                "email": "office@waybertechnologies.com",
              },
              "sameAs": [
                "https://twitter.com/waybertech",
                "https://linkedin.com/company/wayber-technologies",
                "https://github.com/wayber-technologies",
              ],
              "service": [
                {
                  "@type": "Service",
                  "name": "Web Development",
                  "description": "Custom web development services using modern technologies",
                },
                {
                  "@type": "Service",
                  "name": "Mobile App Development",
                  "description": "iOS and Android mobile application development",
                },
                {
                  "@type": "Service",
                  "name": "UI/UX Design",
                  "description": "User interface and user experience design services",
                },
                {
                  "@type": "Service",
                  "name": "Digital Marketing",
                  "description": "Comprehensive digital marketing strategies and implementation",
                },
              ],
              "areaServed": {
                "@type": "Country",
                "name": "United States",
              },
            }),
          }}
        />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
