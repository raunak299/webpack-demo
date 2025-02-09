const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { merge } = require("webpack-merge");
const modeConfig = (env) => require(`./build-utils/webpack.${env.mode}`)(env);
const presetConfig = require("./build-utils/loadPresets");

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
  };

  return merge(baseConfig, modeConfig(env), presetConfig({ mode, presets }));
};
