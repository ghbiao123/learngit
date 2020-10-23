import Vue from 'vue'
import Router from 'vue-router'


import Index from '../pages/index/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'index'
      }
    },
    {
      path: '/index.html',
      name: 'index',
      component: Index
    }
  ]
})
