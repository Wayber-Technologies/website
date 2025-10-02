import "@/styles/globals.css";
import { Footer, Navbar, PreLoad } from "@/components";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps, router }: { Component: any; pageProps: any; router: any }) {
  const [isLoading, setIsLoading] = useState(true);
  const nextRouter = useRouter();

  useEffect(() => {
    // Hide navbar during initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = "default";
    }, 6000); // 6 seconds to match the extended preloader time

    return () => clearTimeout(timer);
  }, []);

  // Force page refresh on route change
  useEffect(() => {
    const handleRouteChange = () => {
      // This will force React to re-render the component tree
      window.scrollTo(0, 0);
    };

    nextRouter.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      nextRouter.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [nextRouter]);

  return (
    <>
      {!isLoading && <Navbar />}
      <AnimatePresence mode="wait">
        {isLoading && <PreLoad />}
      </AnimatePresence>
      <Component key={nextRouter.pathname} {...pageProps} />
      {!isLoading && <Footer />}
    </>
  );
}
