import "@/styles/globals.css";
import type { AppProps } from "next/app";

// Each page renders its own header and footer through SiteLayout.
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
