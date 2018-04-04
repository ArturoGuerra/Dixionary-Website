<template>
    <nav class="navbar has-shadow">
        <div class="navbar-brand">
            <span class="navbar-item">
                <img src="./../assets/img/webicon.jpeg" style="border-radius: 60%; display: block; height: auto; width: auto;">
                <strong>&nbsp; Dixionary</strong>
            </span>
            <div class="navbar-burger burger" id="navtoggle" v-on:click='toggleNav'>
              <span></span>
              <span></span>
              <span></span>
            </div>
        </div>
        <div class="navbar-menu" id='navmenu'>
            <div class="navbar-start">
              <router-link v-for='item in navitems' :id='item.id' :key='item.id' :to='item.href' class='navbar-item is-tab' @click.native="fixMobile" exact>
                <span>{{ item.content }}</span>
              </router-link>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'NavMenu',
  data () {
    return {
      user: null,
      navitems: [
        {href: '/', id: 'Home', content: 'Home'},
        {href: '/dixionary', id: 'dixionary', content: 'Dixionary'},
        {href: '/translate', id: 'translate', content: 'Translate'},
        {href: '/apinfo', id: 'apinfo', content: 'API Info'}
      ]
    }
  },
  methods: {
    toggleNav () {
      document.getElementById('navtoggle').classList.toggle('is-active')
      document.getElementById('navmenu').classList.toggle('is-active')
      if (document.getElementById('navmenu').className.split(' ').length === 2) {
        var navitems = document.getElementsByClassName('navbar-item')
        Array.prototype.filter.call(navitems, (f) => {
          f.className = 'navbar-item'
        })
      }
    },
    fixMobile () {
      this.$nextTick(() => {
        if (document.getElementById('navmenu').className.split(' ').length === 2) {
          var navitems = document.getElementsByClassName('navbar-item')
          Array.prototype.filter.call(navitems, (f) => {
            f.className = 'navbar-item'
          })
        }
      })
    }
  }
}
</script>
