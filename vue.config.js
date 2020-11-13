const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/favour',

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@assets', resolve('src/assets'))
      .set('@common', resolve('src/common'))
      .set('@components', resolve('src/components'))
      .set('@mixins', resolve('src/mixins'))
      .set('@utils', resolve('src/utils'))
      .set('@views', resolve('src/views'))
  },

  configureWebpack: config => {
    return {
      optimization: {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 0,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                return `npm.${packageName.replace('@', '')}`
              },
            },
          },
        },
      },
    }
  },

  devServer: {
    host: '0.0.0.0',
    port: 8080,
    disableHostCheck: true,
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 直接覆盖变量
          hack: `true; @import "${path.join(__dirname, './src/assets/less/custom.less')}";`,
        },
      },
    },
  },
}
