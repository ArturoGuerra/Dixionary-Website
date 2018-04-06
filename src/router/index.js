import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

import Home from '@/pages/Home'
import Dixionary from '@/pages/Dixionary'
import Translate from '@/pages/Translate'
import ApiInfo from '@/pages/ApiInfo'
import Auth from '@/utils'

Vue.use(Router)
Vue.use(Meta)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/dixionary',
      name: 'Dixionary',
      component: Dixionary,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/translate',
      name: 'Translate',
      component: Translate,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/apinfo',
      name: 'ApiInfo',
      component: ApiInfo
    }
  ],
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-active'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    Auth().then(status => {
      if (status) {
        next()
      } else {
        next(from.path)
        location.href = 'https://vvv.dixionary.com/api/login'
      }
    })
  } else {
    next()
  }
})

export default router
