/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", //ダークモードを有効化(ON/OFFの切り替え)
  theme: {
    screens: {
      "min-375": "375px",
      "max-767": { max: "767px" },
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      textShadow: {
        default: "5px 7px 5px rgba(3, 89, 236, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-textshadow")],
};
