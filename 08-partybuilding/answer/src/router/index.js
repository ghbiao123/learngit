import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/mycomponents/HelloWorld'

import Index from "../../src/mycomponents/index.vue"
import Register from '../mycomponents/register.vue'
import Course from '../mycomponents/course.vue'
import Examination from '../mycomponents/examination.vue'

import HeadNav from '../mycomponents/commom/headnav.vue'

Vue.component('headNav', HeadNav);


// 数据请求
import site from '../../config/program.config'
import Axios from "axios"
let isPro = Object.is(process.env.NODE_ENV, 'production');
const baseURL = isPro ? `${site.site}/index.php`: '';
Axios.defaults.baseURL = baseURL;
Vue.prototype.$ajax = Axios;

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {name: 'index'}
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/course',
      name: 'course',
      component: Course
    },
    {
      path: '/examination',
      name: 'examination',
      component: Examination
    }
  ]
})
