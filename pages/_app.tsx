import "@/styles/globals.css";
import { Footer, Navbar, PreLoad } from "@/components";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// Pages that have moved to the new design bring their own header and footer
// and skip the legacy preloader. The rest keep the old chrome until redesigned.
const REDESIGNED_ROUTES = new Set(["/", "/work", "/case/[id]"]);

export default function App({ Component, pageProps }: { Component: any; pageProps: any }) {
  const nextRouter = useRouter();
  const redesigned = REDESIGNED_ROUTES.has(nextRouter.pathname);
  const [isLoading, setIsLoading] = useState(!redesigned);

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

  if (redesigned) return <Component key={nextRouter.pathname} {...pageProps} />;

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
