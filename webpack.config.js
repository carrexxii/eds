const path = require('path')

module.exports = {
  mode: "production",
  entry: {
    user : './build/user/user.js',
    maths: './build/maths/maths.js',
    csc  : './build/csc/csc.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'wwwroot'),
  },
}