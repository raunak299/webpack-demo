const path = require("path");
const webpack = require("webpack");

module.exports = (env) => {
  return {
    mode:env.mode,
    entry: {
      vendor: ["dayjs",], // Example list of modules
    },
    output: {
      filename: "vendor.bundle.js",
      path: path.join(__dirname, "../dist"),
      library: "vendor_lib",
    },
    plugins: [
      new webpack.DllPlugin({
        name: "vendor_lib",
        path: path.join(__dirname, "../dist", "vendor-manifest.json"),
      }),
    ],
  };
};
