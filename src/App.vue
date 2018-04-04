<template>
  <div id="app">
    <NavMenu></NavMenu>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  metaInfo: {
    titleTemplate: '%s - Dixionary',
    meta: [
      { name: 'google-site-verification', content: '2QfKSG5ZPM__yZMnpIm5IJY1x52uhrgyVfbKCbOh0Xk' },
      { property: 'og:title', name: 'twitter:title', content: 'Dixionary' },
      { property: 'og:description', name: 'twitter:description', content: 'This vebsite has each and ewerything dixionary related' },
      { property: 'og:type', name: 'twitter:type', content: 'website' },
      { property: 'og:image', name: 'twitter:image', content: 'https://vvv.dixionary.com' + require('@/assets/img/webicon.jpeg') },
      { property: 'og:url', name: 'twitter:url', content: 'https://vvv.dixionary.com' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:creator', content: '@Ar2roGuerra' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: require('@/assets/img/webicon.jpeg'), size: '10x10' },
      { rel: 'stylesheet', href: require('@/assets/css/bulma.css') },
      { rel: 'stylesheet', href: require('@/assets/css/hero.css') },
      { rel: 'stylesheet', href: require('@/assets/css/customcolors.css') },
      { rel: 'stylesheet', href: require('@/assets/css/bodystyling.css') },
      { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css' }
    ],
    noscript: [
      { innerHTML: 'This website requires JavaScript Madarchod' }
    ]
  }
}
</script>
