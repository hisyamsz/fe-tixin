import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          DEFAULT: "#6366F1",
          50: "#f0f1ff",
          100: "#e0e2ff",
          200: "#c3c6fe",
          300: "#a5a8f9",
          400: "#6366F1", // warna utama
          500: "#5457d7",
          600: "#4649b8",
          700: "#393b98",
          800: "#2e317a",
          900: "#252862",
        },
        secondary: "#6B7280",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
