/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(61, 176, 245)',
        secondary: 'rgb(136, 119, 215)',
        secondarydark: 'rgb(136, 119, 200)',
      },
      boxShadow: {
        'custom-blue': 'rgba(61, 176, 245, 0.4) 0px 5px, rgba(61, 176, 245, 0.3) 0px 10px, rgba(61, 176, 245, 0.2) 0px 15px, rgba(61, 176, 245, 0.1) 0px 20px, rgba(61, 176, 245, 0.05) 0px 25px',
      },
    },
  },
  plugins: [],
}