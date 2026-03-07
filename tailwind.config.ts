import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2D5A3D",
        secondary: "#5B8C5A",
        "light-green": "#A8C5A0",
        cream: "#F4EDE4",
        accent: "#8B6F47",
        "dark-text": "#1A1A1A",
        "light-text": "#6B7B6B",
        error: "#D94F4F",
        success: "#3A8F5C",
        warning: "#D4A017",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        tamil: ["Noto Sans Tamil", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
