module.exports = (env)=>{
    return {
        devtool: 'source-map',
        output: {
            // this will cache the build for production
            filename: '[name].prod.[contenthash].js',
          },
    };
}