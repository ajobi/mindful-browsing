import Vue from 'vue/dist/vue.runtime.min.js'
import Vuex from 'vuex'
import settings from './modules/settings'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    settings
  }
})

chrome.runtime.getBackgroundPage(backgroundGlobal => {
  store.dispatch('settings/init', backgroundGlobal.backgroundAPI)
})

export default store
