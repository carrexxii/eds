const path = require('path')

module.exports = {
  mode: "development",
  entry: [
    './src/user/js/main.js',
    // './src/maths/js/main.js'
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'wwwroot'),
  },
}