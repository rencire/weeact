
module.exports = (env, argv) => ({
  // entry: './src/index',
  ...(argv.mode === 'development') && {devtool: 'inline-source-map'},
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        include: /src/
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  // output: './dist/main.js',
  devServer: {
    contentBase: './dist/'
    // port: 8080
  }

})
