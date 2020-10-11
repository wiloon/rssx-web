module.exports = {
  pwa: {
    // 一些基础配置
    name: 'RSSX',
    assetsVersion: '1.0.0',
    themeColor: '#4DBA00',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'debault',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // 自定义的service worker文件的位置
      swSrc: 'src/service-worker.js'
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
