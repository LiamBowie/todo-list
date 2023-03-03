/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparentBlack: "rgba(0,0,0,0.85)"
      }
    },
  },
  plugins: [],
}