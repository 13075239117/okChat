const path = require('path')
const resolve = dir => path.join(__dirname, dir)
// console.log(resolve(__dirname,'./src/router')),
module.exports = {

  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        // 修改它的选项...
        return {
          ...options,
          transformAssetUrls: {
            'v-img': 'src',
            'el-avatar': 'src',
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: ['xlink:href', 'href'],
            use: ['xlink:href', 'href'],
            'mp-image': ['src'],
            'cover-image': ['src'],
            'mp-audio': ['src', 'poster'],
            'mp-video': ['src', 'poster', 'poster-for-crawler'],
          }
        }
      });
    config.resolve.symlinks(true)
    // 设置快捷路径， @ 表示 'src' ，components 表示 'src/components'
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('assets', resolve('./src/assets'))
      .set('components', resolve('./src/components'))
      .set('views', resolve('./src/views'))
      .set('router', resolve('./src/router'))
      .set('store', resolve('./src/store'))

  },
  devServer: {
    https: true,
    proxy: {  //配置跨域
      '/api': {
        target: 'http://127.0.0.1:3000',  //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true,  //允许跨域
        pathRewrite: {
          /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
            实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
           */
          '^/api': ''
        }
      },
      // '/socket': {
      //   target: 'wss://127.0.0.1:5000', // target host
      //   changeOrigin: true, // needed for virtual hosted sites
      //   logLevel: 'debug',
      //   pathRewrite: {
      //     /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
      //       实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
      //      */
      //     '^/socket': ''
      //   },
      //   wss: true
      // }
      // webpack.config.js

      // main.js
      // 所有 websocket 接口地址加 /websocket 前缀，例：ws://localhost:8080/websocket/dashboard -> wss://notice.app.upall.cn/dashboard
      '/websocket': {
        target: 'ws://127.0.0.1:5000',
        changOrigin: true,  //允许跨域
        ws: true,
        secure: false,
        logLevel: 'debug',
        pathRewrite: {
          '^/websocket': '' // 把二级目录变成一级目录
        },

      },
      '/socket': {
        target: 'ws://127.0.0.1:5001',
        changOrigin: true,  //允许跨域
        ws: true,
        secure: false,
        logLevel: 'debug',
        pathRewrite: {
          '^/socket': '' // 把二级目录变成一级目录
        },

      },
      '/show': {
        target: 'ws://127.0.0.1:5002',
        changOrigin: true,  //允许跨域
        ws: true,
        secure: false,
        logLevel: 'debug',
        pathRewrite: {
          '^/show': '' // 把二级目录变成一级目录
        },

      },
      '/video': {
        target: 'ws://127.0.0.1:5003',
        changOrigin: true,  //允许跨域
        ws: true,
        secure: false,
        logLevel: 'debug',
        pathRewrite: {
          '^/video': '' // 把二级目录变成一级目录
        },

      },
      '/random': {
        target: 'ws://127.0.0.1:5004',
        changOrigin: true,  //允许跨域
        ws: true,
        secure: false,
        logLevel: 'debug',
        pathRewrite: {
          '^/random': '' // 把二级目录变成一级目录
        },

      },
    }
  }
}


const webpack = require('webpack')

