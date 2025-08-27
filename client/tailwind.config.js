/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "retro",
      {
        customtheme: {
          "primary": "#f2eac5",
          "secondary": "#cc6b49",
          "accent": "#d9d9d9",
          "neutral": "#2e282a",
          "base-100": "#4c2215",
        },
      },
    ],
  },
};
