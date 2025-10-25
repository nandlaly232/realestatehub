/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"  // ← THIS LINE MUST BE EXACT
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}