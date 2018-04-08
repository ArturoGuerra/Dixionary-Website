importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "dixionaryvue",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.5f601a77c05605cc1455.js",
    "revision": "5a72a66140fd7e120516b14433688e3e"
  },
  {
    "url": "/_nuxt/layouts/default.876fd999c4b693f06610.js",
    "revision": "224294e3141edb2db96e5e8defbf196e"
  },
  {
    "url": "/_nuxt/manifest.ebd09a90cc638564a2b0.js",
    "revision": "643ea02e3f74634e645b8a0334a2db2a"
  },
  {
    "url": "/_nuxt/pages/apinfo.2fcc8ad88bd0c9d8ee12.js",
    "revision": "4e425eb49fba56f6fe06e9cc87fdf95e"
  },
  {
    "url": "/_nuxt/pages/dixionary.39ef7fcbdffd916157dc.js",
    "revision": "60e2277651a1ff3da0f98ea1ebdb35ca"
  },
  {
    "url": "/_nuxt/pages/index.c7f35ef4cedc23cf36c5.js",
    "revision": "2fe13230a01121f4dcd651c1c4685ae9"
  },
  {
    "url": "/_nuxt/pages/translate.e9a2a07a0b4509d48c7a.js",
    "revision": "3eafa4734fa657ce4860fe69a40a10c4"
  },
  {
    "url": "/_nuxt/vendor.71068fc20cf6d8cebc60.js",
    "revision": "fb32c3e1562e976e3c8851fa21c02650"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

