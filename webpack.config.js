const path = require('path')

module.exports = {
  mode: "development",
  resolve: {
    modules: [
      path.join(__dirname, './node_modules'),
      path.join(__dirname, './src/client/js/fable_modules'),
    ],
  },
  // entry: './src/client/js/main.js',
  entry: {
    main      : './src/client/js/main.js',
    components: './src/client/js/components.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'wwwroot'),
  },
}