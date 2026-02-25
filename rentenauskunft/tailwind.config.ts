import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "renten-blue": "#083163",
        "renten-accent": "#d3db2b",
      },
      fontSize: {
        body: ["16px", "1.6"],
        h1: ["36px", "1.2"],
      },
      boxShadow: {
        soft: "0 18px 45px rgba(0,0,0,0.06)",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
      },
    },
  },
  plugins: [],
};

export default config;
