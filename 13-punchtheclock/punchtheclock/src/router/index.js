import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

// 配置axios
import rootSite from '../../config/program.config'
import Axios from 'axios'
let isPro = Object.is(process.env.NODE_ENV, 'production');
const baseUrl = isPro ? `${rootSite.rootSite}` : '';
Axios.defaults.baseURL = baseUrl;
Vue.prototype.$ajax = Axios;

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
