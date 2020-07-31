import Vue from 'vue/dist/vue.runtime.min.js'
import Vuex from 'vuex'
import settings from './modules/settings'
import backgroundAPI from './modules/backgroundAPI'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    backgroundAPI,
    settings
  }
})

store.dispatch('backgroundAPI/init')

export default store
