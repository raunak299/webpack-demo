const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { merge } = require("webpack-merge");
const modeConfig = (env) => require(`./build-utils/webpack.${env.mode}`)(env);

module.exports = (env) => {
  const { mode, presets = [] } = env;

  const baseConfig = {
    mode: mode,
    entry: "./src/index.js",
    output: {
      // custom filename for lazy loaded chunks
      chunkFilename: "[name].lazy-chunk.js",
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          type: "asset/resource",
        },
        {
          test: /\.(csv|tsv)$/i,
          use: ["csv-loader"],
        },
        {
          test: /\.xml$/i,
          use: ["xml-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "styles.css",
      }),
    ],
    // used to split the code into separate chunks and improve the performance of the application and achieve better caching
    optimization: {
      moduleIds: "deterministic",
      // Webpack may generate multiple runtime chunks, which could impact caching efficiency and result in slightly larger bundles.
      runtimeChunk: "single",
      //Extracts third-party dependencies (node_modules/) into a separate chunk named node_modules_vendor.js, reducing the main bundle size.
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "node_modules_vendor",
            chunks: "all",
          },
        },
      },
    },
  };

  return merge(baseConfig, modeConfig(env));
};
