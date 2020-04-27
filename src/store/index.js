import Vue from 'vue'
import Vuex from 'vuex'

import items from './items'
import basket from './basket'
import auth from './auth'
import info from './info'
import message from './message'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    items,
    basket,
    auth,
    info,
    message,
  }
})
