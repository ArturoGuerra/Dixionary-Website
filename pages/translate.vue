<template>
  <div>
    <section class="hero is-primary blue-gradient-opacity-50 particlesjs">
      <particles></particles>
      <div class="hero-body">
        <div class="container">
          <h1 class="title wow lightSpeedIn">Dixionary Translate</h1>
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
export default {
  name: 'Translate',
  head: {
    title: 'Translate'
  },
  data () {
    return {
      einput: null,
      translated: null
    }
  },
  methods: {
    async translateText () {
      try {
        const result = await this.$axios.$post(
          '/translate',
          { message: this.einput }
        )
        this.translated = result.join(' ')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
