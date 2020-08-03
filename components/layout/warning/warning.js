import Vue from 'vue/dist/vue.runtime.min.js'
import Warning from './components/Warning.vue'
import store from '../../../store'

new Vue({
  store,
  render: h => h(Warning)
}).$mount('#app')
