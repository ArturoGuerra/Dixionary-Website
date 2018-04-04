<template>
  <div>
    <section class="hero is-primary blue-gradient-opacity-50">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Dixionary Translate</h1>
        </div>
      </div>
    </section>
    <section class="hero hero-body">
      <br>
      <h3 class="title">Scammer Translate</h3>
      <div class="field has-addons">
        <div class="control is-expanded">
          <input v-model="einput" class="input" type="text" placeholder="Translate">
        </div>
        <div class="control">
          <a @click="translateText" class="button is-info">
            Search
          </a>
        </div>
      </div>
      <br>
      <p v-if="translated">
      Result: {{ translated }}
      </p>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Translate',
  metaInfo: {
    title: 'Translate'
  },
  data () {
    return {
      einput: null,
      translated: null
    }
  },
  methods: {
    translateText () {
      axios({
        method: 'post',
        url: 'https://vvv.dixionary.com/api/translate',
        data: {
          message: this.einput
        }
      }).then(response => {
        this.translated = response.data.join(' ')
      }).catch(console.error)
    }
  }
}
</script>
