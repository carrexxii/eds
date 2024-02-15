/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components.html",
    "./src/*.fs",
    "./src/*/*.fs",
    "./src/*/*/*.fs",
  ],
  theme: {
    fontFamily: {
      'sans' : ['inter-regular', 'sans-serif'],
      'serif': ['serif'],
      'mono' : ['"IBM Plex Mono"', 'mono'],
    },
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require('@tailwindcss/typography'),
  ],
}
