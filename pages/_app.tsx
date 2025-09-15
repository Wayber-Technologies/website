import "@/styles/globals.css";
import { Footer, Navbar } from "@/components";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps, router }: { Component: any; pageProps: any; router: any }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide navbar during initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000); // 5 seconds to match the extended preloader time

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!isLoading && <Navbar />}
      <AnimatePresence mode="wait">
        <Component key={router.route} {...pageProps} />
      </AnimatePresence>
      <Footer />
    </>
  );
}
