import Vue from 'vue'
import Router from 'vue-router'

import Index from "../pages/index/index.vue";
import Login from "../pages/login/login.vue";
import Register from "../pages/register/register.vue";
import Main from "../pages/main/main.vue";
import ChangePassWord from "../pages/changepassword/changepassword.vue";
import PersonalData from "../pages/personaldata/personaldata.vue";
import Record from "../pages/record/record.vue";
import Notice from "../pages/notice/notice.vue";
import NoticeDetail from "../pages/noticedetail/noticedetail.vue";



// 配置axios
import rootSite from '../../config/program.config'
import Axios from 'axios'
let isPro = Object.is(process.env.NODE_ENV, 'production');
const baseUrl = isPro ? `${rootSite.rootSite}/index.php` : '';
Axios.defaults.baseURL = baseUrl;
Vue.prototype.$ajax = Axios;

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: "index"
      }
    },
    {
      path: "/",
      name: "index",
      component: Index
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/main",
      name: "main",
      component: Main
    },
    {
      path: "/changepassword",
      name: "changepassword",
      component: ChangePassWord
    },
    {
      path: "/personaldata",
      name: "personaldata",
      component: PersonalData
    },
    {
      path: "/record",
      name: "record",
      component: Record
    },
    {
      path: "/notice",
      name: "notice",
      component: Notice
    },
    {
      path: "/noticedetail",
      name: "noticedetail",
      component: NoticeDetail
    }
  ]
})
