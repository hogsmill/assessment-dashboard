import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store'

require('./assets/site.css')

Vue.config.productionTip = false

const app = new Vue({
  el: '#app',
  store,
  render: (h) => h(App),
})
