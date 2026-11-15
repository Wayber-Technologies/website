import type { Config } from "tailwindcss";

// Only Tailwind's preflight reset is used (see styles/globals.css).
const config: Config = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {},
  plugins: [],
};

export default config;
