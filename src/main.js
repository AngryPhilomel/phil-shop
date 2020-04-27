import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import Loader from './components/Loader'
import modalPlugin from './utils/modal.plugin'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.component('Loader', Loader)
Vue.use(modalPlugin)


firebase.initializeApp({
    apiKey: "AIzaSyBQo49zBNjXhZo4vMcYlF1a8kKHhGWezf8",
    authDomain: "phil-shop.firebaseapp.com",
    databaseURL: "https://phil-shop.firebaseio.com",
    projectId: "phil-shop",
    storageBucket: "phil-shop.appspot.com",
    messagingSenderId: "738593901479",
    appId: "1:738593901479:web:67141c5e85ff74da300482"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
  app = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app")
  }
})
