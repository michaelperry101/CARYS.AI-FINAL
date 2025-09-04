/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        carys: {
          blue: "#3DA2FF",     // light blue accent
          soft: "#F4F8FF",     // soft white-blue background
          text: "#0F172A"      // slate-ish dark text
        }
      },
      boxShadow: {
        soft: "0 10px 25px rgba(0,0,0,0.06)"
      },
      borderRadius: {
        xl2: "1rem"
      }
    }
  },
  plugins: []
};
