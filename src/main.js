// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import LocalStorage from './storage/index'

import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap'
import Toasted from 'vue-toasted'

import CreateContest from '@/components/CreateContest/CreateContest'

Vue.config.productionTip = false
Vue.prototype.$localStorage = LocalStorage
Vue.prototype.$ajax = Axios

Vue.use(Toasted, { theme: 'bubble', position: 'bottom-right', duration: 2500 })

Vue.component('create-contest', CreateContest)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
