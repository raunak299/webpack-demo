const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { merge } = require("webpack-merge");
const modeConfig = (env) => require(`./build-utils/webpack.${env.mode}`)(env);

module.exports = (env) => {
  const { mode } = env;

  const baseConfig = {
    mode: mode,
    entry: "./src/index.js",
    output: {
      // custom filename for lazy loaded chunks
      chunkFilename: "[name].lazy-chunk.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    // used to split the code into separate chunks and improve the performance of the application and achieve better caching
    optimization: {
      // this wont change hash of vendor file even if content changes, as it is not required to change
      // think of vendor as chunk which is removed from main bundle
      moduleIds: "deterministic",
      // Setting runtimeChunk: 'single' in Webpack optimizes the build by ensuring that only one runtime chunk is generated for multiple entry point also separate runtime code from main bundle, leading to better caching and potentially smaller bundle sizes. If you don't specify 'single', Webpack may generate multiple runtime chunks, which could impact caching efficiency and result in slightly larger bundles.
      runtimeChunk: "single",
      // splitChunks focuses on optimizing the code split into separate chunk
      splitChunks: {
        //  this configuration tells webpack to create a separate chunk named 'vendors' for modules imported from node_modules, regardless of whether they are used in initial or asynchronous chunks. This can help optimize the loading performance by separating third-party vendor code from application code.

        /*This configuration for splitChunks in webpack is specifying how to split code into separate chunks based on certain conditions. 
        Let's break down each part:
        cacheGroups: This is an object where you define individual cache group configurations. Cache groups allow you to specify conditions under which chunks should be grouped together and given a common name.
vendor: This is the name of the cache group. It's a convention to name this group vendor, but you can choose any name you like.
test: This is a regular expression that matches the module paths. In this case, it's matching modules located in the node_modules directory. This means that any module imported from node_modules will be included in this cache group. 
name: This is the name of the chunk that will be generated. In this case, it's set to 'vendors', so all modules matching the test condition will be grouped into a chunk named vendors.
chunks: This specifies which chunks should be included in this cache group. 'all' means that modules from both initial and asynchronous chunks will be included. */

        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "node_modules_vendor",
            // 'all' means that modules from both initial and asynchronous chunks will be included.
            chunks: "all",
          },
        },
      },
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

  return merge(baseConfig, modeConfig(env));
};
