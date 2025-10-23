"use client";
import "./globals.css";
import { Figtree, Instrument_Serif } from "next/font/google";
import { ThemeProvider } from "next-themes";

const figtree = Figtree({ subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light" storageKey="wayber-theme">
      {children}
    </ThemeProvider>
  );
}
