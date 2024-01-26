/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/client/components.html",
    "./src/client/*.fs"
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
