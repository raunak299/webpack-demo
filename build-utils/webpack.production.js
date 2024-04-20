module.exports = (env)=>{
    return {
        devtool: 'source-map',
        output: {
            // this will cache the build for production
            filename: 'bundle.prod.[contenthash].js',
          },
    };
}