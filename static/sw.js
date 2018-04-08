importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "dixionaryvue",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.685221de7dfe01c733b2.js",
    "revision": "a14894453fcb41af272ed13e5869797f"
  },
  {
    "url": "/_nuxt/layouts/default.3c753c01d196e359f4c1.js",
    "revision": "20b699f7f3ecf292fab6e32bef2503d9"
  },
  {
    "url": "/_nuxt/manifest.7d756eae8ede405d5fda.js",
    "revision": "7bb8958ef86d84c4a47792937c078354"
  },
  {
    "url": "/_nuxt/pages/apinfo.2fcc8ad88bd0c9d8ee12.js",
    "revision": "4e425eb49fba56f6fe06e9cc87fdf95e"
  },
  {
    "url": "/_nuxt/pages/dixionary.cb30c9a46178c6610eb1.js",
    "revision": "730ea1432bb8efc8e5535c24d63bb9f6"
  },
  {
    "url": "/_nuxt/pages/index.c45d2332aacda9d8451b.js",
    "revision": "b11395bbf3f39c9b2faccfe684e0cdc5"
  },
  {
    "url": "/_nuxt/pages/translate.3bf0bb0f86230ecd221a.js",
    "revision": "7c47633f58e26b284f9848d44943b684"
  },
  {
    "url": "/_nuxt/vendor.8e3649c62c9f89005f61.js",
    "revision": "e03214a2e26bbc5a05faaab68a8a1681"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

