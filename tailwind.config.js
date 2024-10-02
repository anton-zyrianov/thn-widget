/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#2b2b2b'
      }
    },
    fontFamily: {
      base: ['Avenir', 'sans-serif'],
      title: ['Marselis', 'serif']
    }
  },
  plugins: []
}
