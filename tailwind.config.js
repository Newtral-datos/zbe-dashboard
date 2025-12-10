/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'zbe-primary': '#01f3b3',
        'zbe-secondary': '#00a8cc',
      }
    },
  },
  plugins: [],
}
