import type { Config } from "tailwindcss";

const spacing = Array(1000)
  .fill(0)
  .reduce((acc, _, i) => ({ ...acc, [i]: `${i}px` }), {});

const fontSize = Array(150)
  .fill(0)
  .reduce((acc, _, i) => ({ ...acc, [i]: `${i}px` }), {});

const screens = {
  "2xl": { max: "1525px" },
  xl: { max: "1279px" },
  lg: { max: "1023px" },
  md: { max: "880px" },
  sm: { max: "639px" },
  xs: { max: "376px" },
};

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "100": "#FFE8F0",
          DEFAULT: "#EE2B69",
        },
        secondary: "#FBE843",
        black: {
          "100": "#333333",
          "200": "#141413",
          "300": "#7D8087",
          DEFAULT: "#000000",
        },
        white: {
          "100": "#F7F7F7",
          DEFAULT: "#FFFFFF",
        },
      },
      fontFamily: {
        "work-sans": ["var(--font-work-sans)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        100: "2px 2px 0px 0px rgb(0, 0, 0)",
        200: "2px 2px 0px 2px rgb(0, 0, 0)",
        300: "2px 2px 0px 2px rgb(238, 43, 105)",
      },
      spacing,
      fontSize,
      screens,
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
