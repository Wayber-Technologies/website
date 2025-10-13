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
  title: 'Wayber Agency - Transform Your Business',
  description: 'We help startups tackle the world\'s biggest challenges with tailored solutions that drive real impact',
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
      </head>
      <body className={`${figtree.className} ${instrumentSerif.className}`}>{children}</body>
    </html>
  );
}
