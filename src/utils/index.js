import axios from 'axios'

export default function () {
  return new Promise((resolve, reject) => {
    axios.get('/api/auth')
      .then(response => {
        let resp = response.data
        if (resp.auth) {
          localStorage.setItem('username', resp.auth.user)
          resolve(true)
        } else {
          resolve(false)
        }
      }).catch(reject)
  })
}
