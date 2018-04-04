<template>
  <footer class="footer">
    <div class="container">
        <div class="content has-text-centered">
            <p>
            <strong><a href="/">Dixionary.com</a><strong> povered by <a href="https://expressjs.com/">Hitler</a> and <a href="https://nodejs.org">ISIS</a>. Made by <a href="http://arturonet.com">TheOfficialDixionary</a>
            </p>
            <p>
            <a class="icon" href="https://github.com/ArturoGuerra/Dixionary-Website">
                <i class="fa fa-github"></i>
            </a>
            </p>
            <p>
            <strong>Your IP is {{ ip }}</strong>
            </p>
        </div>
    </div>
  </footer>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Footer',
  data () {
    return {
      ip: ''
    }
  },
  mounted () {
    axios({
      method: 'GET',
      url: 'https://httpbin.org/ip'
    }).then(result => {
      this.ip = result.data.origin
    }, error => {
      console.log(error)
    })
  }
}
</script>
