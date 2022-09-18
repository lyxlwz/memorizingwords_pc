const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/memorizingwords_pc' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    hot: true,
    port: 5566,
    open: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/': {
        // pathRewrite: { "^/api": "api" },
        pathRewrite: { '^/': '' },
        changeOrigin: true,
        // ws: true,
        // target: 'http://127.0.0.1:8182' //后端自己测试

        target: 'http://www.learning.com/public/index.php/index' // 正式环境
      }
    }

  },
  chainWebpack(config) {
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin')
        .use(new CompressionPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.js$|\.html$|.\css/,
          threshold: 10240,
          deleteOriginalAssets: false
        }))
    }
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
