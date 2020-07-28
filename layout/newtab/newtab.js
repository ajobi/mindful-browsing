import Vue from 'vue/dist/vue.runtime.min.js'
import NewTab from './components/NewTab.vue'
import store from '../../store'

new Vue({
  store,
  render: h => h(NewTab)
}).$mount('#app')
