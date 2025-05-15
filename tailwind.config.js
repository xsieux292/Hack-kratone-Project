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
    screens: {
      'xs': '420px',   // กำหนด breakpoint xs เองที่ 420px
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  plugins: [],
}

