<template>
  <div>
    <section class="hero is-dark is-medium blue-gradient-1">
        <div class="hero-body">
          <div class="container has-text-centered">
            <h1 class="title">Dixionary API Docs</h1>
            <h2 class="subtitle">#MAKEAMERICAGREATAGAIN</h2>
          </div>
        </div>
    </section>
    <section class="hero hero-body">
    <div class='container'>
      <h1 class='title'>Python Example <span class="tag is-info">2.7</span></h1>
      <hr>
      <div class="container notification">
        <p class='content'>
        import requests<br>
        request = request.push('https://api.dixionary.com/api/get', json={"message": "what"})<br>
        print request<br>
        print request.json()
        </p>
      </div>
      <br>
      <h1 class='title'>Python Example <span class="tag is-info">3.4 > 3.6</span></h1>
      <hr>
      <div class="container notification">
        <p class='content'>
        import requests<br>
        request = request.push('https://api.dixionary.com/api/get', json={"message": "what"})<br>
        print(request)<br>
        print(request.json())
        </p>
      </div>
      <br>
      <h1 class='title'>NodeJS Example <span class="tag is-info">v8.3.0</span></h1>
      <hr>
      <div class='container notification'>
        <p class='content'>
        const requestify = require('requestify');<br>
        requestify.post('https://api.dixionary.com/api/get', {message: "what"}).then(result => {<br>
        console.log(result.getBody());<br>
        }).catch(console.error);
        </p>
      </div>
      <br>
    </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ApiInfo',
  head: {
    title: 'ApiInfo'
  }
}
</script>
