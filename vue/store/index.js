import Vue from 'vue/dist/vue.runtime.min.js'
import Vuex from 'vuex'
import settings from './modules/settings'
import backgroundAPI from './modules/backgroundAPI'
import warning from './modules/warning'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    backgroundAPI,
    settings,
    warning,
  }
})

store.dispatch('backgroundAPI/init')
store.dispatch('warning/init')

export default store
