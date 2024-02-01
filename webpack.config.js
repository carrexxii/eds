const path = require('path')

module.exports = {
  mode: "development",
  entry: {
    user : './build/user/main.js',
    maths: './build/maths/maths.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'wwwroot'),
  },
}