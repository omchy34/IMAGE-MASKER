/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: '#0b132b',
        deepBlue: '#1c2541',
        deepDark: '#192a56',
        darkLight: '#243b55',
        lightBlue: '#3aafda',
      },
    },
  },
  plugins: [],
}
