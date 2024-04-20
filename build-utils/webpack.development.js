const webpack = require("webpack");

module.exports = (env) =>  {
    return {
  devtool: 'inline-source-map',
  output: {
    // this will cache the build for development
    filename: 'bundle.[contenthash].js',
  },
  // this will show the progress of the build
  plugins: [new webpack.ProgressPlugin()
  ]
};
};
