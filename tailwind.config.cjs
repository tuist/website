/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./public/logos/**/*.svg",
  ],
  theme: {
    animation: {
      "infinite-scroll": "infinite-scroll 25s linear infinite",
    },
    keyframes: {
      "infinite-scroll": {
        from: { transform: "translateX(0)" },
        to: { transform: "translateX(-100%)" },
      },
    },
    fontSize: {
      xs: [
        "0.75rem",
        {
          lineHeight: "1rem",
        },
      ],
      sm: [
        "0.875rem",
        {
          lineHeight: "1.5rem",
        },
      ],
      base: [
        "1rem",
        {
          lineHeight: "1.75rem",
        },
      ],
      lg: [
        "1.125rem",
        {
          lineHeight: "2rem",
        },
      ],
      xl: [
        "1.25rem",
        {
          lineHeight: "2rem",
        },
      ],
      "2xl": [
        "1.5rem",
        {
          lineHeight: "2rem",
        },
      ],
      "3xl": [
        "2rem",
        {
          lineHeight: "2.5rem",
        },
      ],
      "4xl": [
        "2.5rem",
        {
          lineHeight: "3.5rem",
        },
      ],
      "5xl": [
        "3rem",
        {
          lineHeight: "3.5rem",
        },
      ],
      "6xl": [
        "3.75rem",
        {
          lineHeight: "1",
        },
      ],
      "7xl": [
        "4.5rem",
        {
          lineHeight: "1.1",
        },
      ],
      "8xl": [
        "6rem",
        {
          lineHeight: "1",
        },
      ],
      "9xl": [
        "8rem",
        {
          lineHeight: "1",
        },
      ],
    },
    extend: {
      backgroundImage: {
        "gradient-conic": "conic-gradient(var(--tw-gradient-stops))",
      },
      keyframes: {
        disco: {
          "0%": { transform: "translateY(-50%) rotate(0deg)" },
          "100%": { transform: "translateY(-50%) rotate(360deg)" },
        },
      },
      animation: {
        disco: "disco 1.5s linear infinite",
      },

      colors: {
        blue: {
          50: "#E8E5FF",
          100: "#D1CCFF",
          200: "#A399FF",
          300: "#7566FF",
          400: "#4733FF",
          500: "#1A00FF",
          600: "#1400CC",
          700: "#0F0099",
          800: "#0A0066",
          900: "#050033",
        },
        sky: {
          50: "#391D9E",
          100: "#4121B1",
          200: "#4926C5",
          300: "#512BD8",
          400: "#5930EC",
          500: "#6236FF",
          600: "#674DFF",
          700: "#7064FF",
          800: "#7B7BFF",
          900: "#9299FF",
        },
        vulcan: {
          50: "#BACDD5",
          100: "#AEC2CE",
          200: "#94ACBE",
          300: "#7B95AF",
          400: "#617CA0",
          500: "#526587",
          600: "#424F6D",
          700: "#333A54",
          800: "#23273A",
          900: "#141521",
        },
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "3rem",
        "6xl": "5rem",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/forms"),
  ],
};
