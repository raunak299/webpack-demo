const webpack = require("webpack");

module.exports = (env) =>  {
    return {
  devtool: 'inline-source-map',
  plugins: [new webpack.ProgressPlugin()
  ]
};
};
