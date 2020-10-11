workbox.core.setCacheNameDetails({
  prefix: 'rssx',
  suffix: 'v1'
})

workbox.core.skipWaiting();
workbox.core.clientsClaim();

/*
* vue-cli3.0通过workbox-webpack-plagin 来实现相关功能，我们需要加入
* 以下语句来获取预缓存列表和预缓存他们，也就是打包项目后生产的html，js，css等* 静态文件
*/
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

workbox.routing.registerRoute(
  /\/api/, new workbox.strategies.NetworkOnly()
)
workbox.routing.registerRoute(
  /\.(jpe?g|png)/,
  new workbox.strategies.CacheFirst({
    cacheName: 'image-runtime-cache',
    plugins: [
      new workbox.expiration.Plugin({
        // 对图片资源缓存 1 星期
        maxAgeSeconds: 7 * 24 * 60 * 60,
        // 匹配该策略的图片最多缓存 10 张
        maxEntries: 10
      })
    ]
  })
)
workbox.routing.registerRoute(
  /\.(css|js)/,
  new workbox.strategies.CacheFirst({
    cacheName: 'css_js-runtime-cache',
    plugins: [
      new workbox.expiration.Plugin({
        // 对图片资源缓存 1 星期
        maxAgeSeconds: 7 * 24 * 60 * 60,
        // 匹配该策略的图片最多缓存 10 张
        maxEntries: 10
      })
    ]
  })
)
