const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = () => ({
  plugins:  [new BundleAnalyzerPlugin({
    analyzerMode: 'static', // Generate an HTML report at the end
    openAnalyzer: true, // Do not open the report automatically
  }),
]
});
