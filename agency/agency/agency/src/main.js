// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'babel-polyfill'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import {AlertPlugin, ConfirmPlugin} from 'vux'
import qs from 'qs'
import api from './api/api.js'
import store from '../src/store/store.js'
import common from './common/common.js'
import utlis from './components/Agency/utils.js'
import formate from './formate/formate.js'
import wxapi from './components/Agency/wxapi.js'
Vue.use(AlertPlugin, ConfirmPlugin)
Vue.config.productionTip = false
Vue.prototype.$http = axios
axios.defaults.withCredentials = true
Vue.prototype.$qs = qs
Vue.prototype.$api = api
Vue.prototype.$utlis = utlis
Vue.prototype.$wxapi = wxapi
Vue.prototype.$common = common
Vue.prototype.$formate = formate
Vue.use(Vuex)
Vue.use(Mint)
var IStore = new Vuex.Store({
  modules: {
    i18n: vuexI18n.store
  }
})
Vue.use(vuexI18n.plugin, IStore)
var translationsEn = {
  'content': 'This is som {type} content'
}
var tips = localStorage.getItem('tips')
console.log(tips)
Vue.i18n.set('en', translationsEn)
axios.interceptors.response.use((response) => {
  if (response.data.code === -1) {
    router.replace({
        path: '/login'
    })
    localStorage.setItem('code', false)
  } else {
    localStorage.setItem('code', true)
  }
  return response
}, function (error) {
  console.log('===>' + error)
  return Promise.reject(error)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
