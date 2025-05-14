/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        // เพิ่มฟอนต์จาก Google Fonts
        roboto: ['Kanit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

