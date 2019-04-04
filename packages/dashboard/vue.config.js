module.exports = {
  lintOnSave: true,
  publicPath: '',
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      symlinks: false,
      alias: {
        '@': 'src/'
      }
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: ['/public/index.html']
        }
      ]
    }
  }
};
