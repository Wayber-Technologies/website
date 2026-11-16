/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cover images for the Medium articles on the homepage.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn-images-1.medium.com" },
      { protocol: "https", hostname: "miro.medium.com" },
    ],
  },
  async redirects() {
    return [
      // The old "Our work" page and the leftover template case page now live at /work.
      { source: "/presentation", destination: "/work", permanent: false },
      { source: "/case", destination: "/work", permanent: false },
      // The CPCompass case used to live at /case/commercio.
      { source: "/case/commercio", destination: "/case/cpcompass", permanent: true },
      // The old About page, and the "Insights" page (template posts) now that the journal lives on Medium.
      { source: "/wayber-team", destination: "/about", permanent: false },
      { source: "/insights", destination: "https://medium.com/@waybertechnologies", permanent: false },
    ];
  },
};

export default nextConfig;
