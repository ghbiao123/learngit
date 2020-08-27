import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/mycomponents/HelloWorld'

import Index from "../../src/mycomponents/index.vue"


// 数据请求
import site from '../mycomponents/index.vue'
import Axios from "axios"
// Axios.defaults.baseURL = site.site;
Vue.prototype.$ajax = Axios;

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {name: 'index'}
    },
    {
      path: '/',
      name: 'index',
      component: Index
    }
  ]
})
