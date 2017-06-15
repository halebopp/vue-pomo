// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Toast from 'vue-easy-toast'
import App from './App'
import router from './router'
import store from './store'
import fbApp from './modules/firebase'

Vue.use(Toast)
Vue.config.productionTip = false

/* eslint-disable no-new */

const unsubscribe = fbApp.auth().onAuthStateChanged(() => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })

  unsubscribe()
})
