<template>
  <div>
    <section class="hero is-dark is-medium blue-gradient-1">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class=title>Dixonary List</h1>
          <h2 class=subtitle>Each & Ewery vord in the dixionary</h2>
          <h3>#ANTIVAXXERS</h3>
        </div>
      </div>
    </section>
    <section class="section">
      <div id='spinner' class="container">
        <div style="margin: auto;" class="spinner"></div>
        <br>
      </div>
      <div class="container has-text-centered">
        <table class="table is-fullwidth">
          <thead>
          <tr>
              <th>Scammer</th>
              <th>English</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for='item in dixionary' :key='item.scammer'>
              <th>
                {{ item.scammer }}
              </th>
              <th>
                {{ item.english }}
              </th>
            </tr>
          </tbody>
        </table>
        <div>
            <a @click='decrease()' class='button tag is-info' style='text-decoration: none;'>&#8617;</a>
            <span class='tag is-rounded'>{{ index + 1 }}</span>
            <a @click='increase()' class='button tag is-info' style='text-decoration: none;'>&#8618;</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Dixionary',
  metaInfo: {
    title: 'Dixionary'
  },
  data () {
    return {
      index: 0,
      maxed: false,
      dixionary: []
    }
  },
  methods: {
    getdixionary () {
      axios.get('https://api.dixionary.com/api/fetch', {
        params: {
          index: this.index
        }
      })
        .then(response => {
          this.dixionary = response.data
        })
        .catch(console.error)
    },
    decrease () {
      if (this.index === 0) return
      this.index -= 1
      this.getdixionary()
      this.$forceUpdate()
    },
    increase () {
      if (this.dixionary.length < 20) return
      this.index += 1
      this.getdixionary()
      this.$forceUpdate()
    }
  },
  created () {
    this.getdixionary()
  }
}
</script>
