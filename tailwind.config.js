/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/server/templates/*.html",
    "./src/client/wwwroot/*.html"
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
    require("@tailwindcss/forms")
  ],
}
