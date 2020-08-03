import Vue from 'vue/dist/vue.runtime.min.js'
import NewTab from '../../vue/components/newtab/NewTab.vue'
import store from '../../vue/store'

new Vue({
  store,
  render: h => h(NewTab)
}).$mount('#app')
