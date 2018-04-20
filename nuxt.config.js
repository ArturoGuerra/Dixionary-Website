module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - Dixionary',
    meta: [
      { charset: 'utf-8' },
      { name: 'theme-color', content: '#0C66A1' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Dixionary Website' },
      { property: 'og:title', hid: 'og:title', content: 'dixionary.com' },
      { property: 'og:description', hid: 'og:description', content: "Dixionary website" },
      { property: 'og:type', hid: 'og:type', content: 'website' },
      { property: 'og:image', hid: 'og:image', content: 'https://vvv.dixionary.com/favicon.ico' },
      { hid: 'twitter:url', name: 'twitter:url', content: 'https://vvv.dixionary.com' },
      { hid: 'twitter:title', name: 'twitter:title', content: 'dixionary.com' },
      { hid: 'twitter:description', name: 'twitter:description', content: "Dixionary website" },
      { hid: 'twitter:type', name: 'twitter:type', content: 'website' },
      { hid: 'twitter:image', name: 'twitter:image', content: 'https://vvv.dixionary.com/favicon.ico' },
      { hid: 'twitter:url', name: 'twitter:url', content: 'https://vvv.dixionary.com' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
      { hid: 'twitter:creator', name: 'twitter:creator', content: '@Ar2roGuerra' },
      { hid: 'apple-mobile-web-app-title', name: 'apple-mobile-web-app-title', content: 'dixionary.com' }

    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-icon-57x57.png' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon-180x180.png' },
      { rel: 'icon', type: 'image/png', sizes: '192x192',  href: '/android-icon-192x192.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico', sizes: '10x10' }

    ]
  },

  manifest: {
    name: "dixionary",
    short_name: "dixionary",
    discription: "Scammer dixionary website",
    icons: [{
      src: '/android-icon-192x192.png',
      sizes: '192x192',
      type: 'image/png'
    },
    {
      src: '/favicon-32x32.png',
      sizes: '32x32',
      type: 'image/png'
    },
    {
      src: '/favicon-96x96.png',
      sizes: '96x96',
      type: 'image/png'
    },
    {
      src: '/favicon-16x16.png',
      sizes: '16x16',
      type: 'image/png'
    }]
  },

  css: [
    '~/assets/css/bulma.css',
    'colors.css/css/colors.min.css',
    '~/assets/css/animate.css',
    '~/assets/css/bodystyling.css',
    '~/assets/css/colors.css',
    '~/assets/css/hero.css',
    '~/assets/css/particles.css'
  ],

  /*
  ** Customize the progress bar color
  */
  loading: {
    color: '#41aad2',
    height: '3px'
  },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    vender: ['axios', 'wowjs'],
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  router: {
    linkActiveClass: 'is-active',
    linkExactActiveClass: 'is-active'
  },
  plugins: [
    { src: '~/plugins/particles.js', ssr: false },
    { src: '~/plugins/wow.js', ssr: false }
  ],
  modules: [
    ['@nuxtjs/pwa'],
    '@nuxtjs/axios'
  ],
  axios: {
    baseURL: 'https://vvv.dixionary.com',
    browserBaseURL: '/api'
  },
  render: {
    http2: true
  }
}
