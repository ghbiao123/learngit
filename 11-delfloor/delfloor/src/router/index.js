import Vue from 'vue'
import Router from 'vue-router'


import Index from '../pages/index/index.vue'

// 配置axios
import rootSite from '../../config/program.config'
import Axios from 'axios'
let isPro = Object.is(process.env.NODE_ENV, 'production');
const baseUrl = isPro ? `${rootSite}` : '';
Axios.defaults.baseURL = baseUrl;
Vue.prototype.$ajax = Axios;


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
