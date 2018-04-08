importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "dixionaryvue",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.19fa5e4ea57142c99fa2.js",
    "revision": "07dc4bb46974cb1b372ae37446b00940"
  },
  {
    "url": "/_nuxt/layouts/default.9977540d3541520c00d8.js",
    "revision": "d6fc5fc8f58b8ef6a1fad1cac056a8a1"
  },
  {
    "url": "/_nuxt/manifest.263185a64bf42335217c.js",
    "revision": "3fed234e44a8425effe14fa7117fa390"
  },
  {
    "url": "/_nuxt/pages/apinfo.863985e809612cb8b2b8.js",
    "revision": "9de4707b8594e032e75d8bbdf82a5d2e"
  },
  {
    "url": "/_nuxt/pages/dixionary.99cc692d72d5fefd27c1.js",
    "revision": "999692191aa3d6b9a43daa6f0dbbd7f2"
  },
  {
    "url": "/_nuxt/pages/index.f431eaceba597623d67a.js",
    "revision": "faa4c820f96a3de4f33155cbb703c1e7"
  },
  {
    "url": "/_nuxt/pages/translate.7e521edfccfb98afea51.js",
    "revision": "4f3f1921def1f194af52d936c5417630"
  },
  {
    "url": "/_nuxt/vendor.8e3649c62c9f89005f61.js",
    "revision": "e03214a2e26bbc5a05faaab68a8a1681"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

