const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const {merge} = require("webpack-merge"); 
const modeConfig = (env) => require(`./build-utils/webpack.${env.mode}`)(env);

module.exports = (env) => {
  const { mode } = env;
  let outputFilename = 'bundle.js';
  env.filename && (outputFilename = env.filename);

  const baseConfig = {
    mode: mode,
    entry: "./src/index.js",
    output: {
      filename: outputFilename,
      path: path.resolve(__dirname, "dist"),
      clean: true,
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

  return merge(baseConfig,modeConfig(env));
};
