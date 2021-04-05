import Vue from 'vue'

import App from './App.vue'
import router from './router/index.js'
import store from 'store/store.js'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import animated from 'animate.css'
import Vuetify from 'vuetify'
import VueSocketIO from 'vue-socket.io'

import '@mdi/font/css/materialdesignicons.css'
// import ''
import 'vuetify/dist/vuetify.min.css'
// import socketClient from 'components/content/network/WebSocket.js'
// socketClient()
axios.defaults.withCredentials = true;
axios.defaults.baseURL = '/api'

//showwebsocket

// import global from 'assets/js/global.js'
// Vue.prototype.global = global

//
//date方法
Date.prototype.toLocaleString = function () {
  // 补0   例如 2018/7/10 14:7:2  补完后为 2018/07/10 14:07:02
  function addZero(num) {
    if (num < 10)
      return "0" + num;
    return num;
  }
  // 按自定义拼接格式返回
  return this.getFullYear() + "." + addZero(this.getMonth() + 1) + "." + addZero(this.getDate()) + " " +
    addZero(this.getHours()) + ":" + addZero(this.getMinutes())
};
Vue.prototype.$bus = new Vue()
// Vue.prototype.$ws = new WebSocket("ws://127.0.0.1:5000");
// Vue.prototype.socket = io('/socket.io')

// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: 'http://127.0.0.1:8080',  //
// }))
Vue.use(Vuetify)
Vue.use('axios')
Vue.use(ElementUI);
Vue.use(animated)
// console.log(login);
Vue.config.productionTip = false


new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  render: h => h(App)
}).$mount('#app')
