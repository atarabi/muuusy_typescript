var webpack = require("webpack");

module.exports = {
  output: {
    filename: "[name].js"
  },
  resolve: {
    extensions: ['', '.js', '.ejs', '.ts'],
    modulesDirectories: ['node_modules']
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: "html-loader" },
      { test: /\.html$/, loader: "underscore-template-loader" },
      { test: /masonry-layout/, loader: "imports?define=>false&this=>window" },
      { test: /imagesloaded/, loader: "imports?define=>false&this=>window" },
      { test: /jquery-mockjax/, loader: 'imports?jQuery=jquery'},
      { test: /\.ejs$/, loader: "ejs-loader" },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
};
