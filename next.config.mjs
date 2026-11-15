/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // The old "Our work" page and the leftover template case page now live at /work.
      { source: "/presentation", destination: "/work", permanent: false },
      { source: "/case", destination: "/work", permanent: false },
    ];
  },
};

export default nextConfig;
