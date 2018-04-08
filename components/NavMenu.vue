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
        <div class="is-hidden-desktop navbar-menu" id='navmenu'>
            <div class="navbar-start">
              <router-link v-for='item in navitems' :id='item.id' :key='item.id' :to='item.href' class='navbar-item' exact>
                <span>{{ item.content }}</span>
              </router-link>
            </div>
        </div>
        <div class="navbar-menu">
            <div class="navbar-start">
              <router-link v-for='item in navitems' :id='item.id' :key='item.id' :to='item.href' class='navbar-item is-tab' exact>
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
  }
}
</script>
