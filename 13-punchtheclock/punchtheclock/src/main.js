// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// element-ui 
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

// mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);

// header component
import Header from "./component/header/header.vue";
Vue.component("headNav", Header);

// btn component
import Mybtn from "./component/mybtn/mybtn.vue";
Vue.component("myBtn", Mybtn);

// common.css 样式初始化
import "./assets/common.css";

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
