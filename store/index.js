import Vue from 'vue/dist/vue.runtime.min.js'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  getters: {
    count: state => {
      return state.count
    }
  }
})
