import Vue from 'vue/dist/vue.runtime.min.js'
import Warning from '../../vue/components/warning/Warning.vue'
import store from '../../vue/store'

new Vue({
  store,
  render: h => h(Warning)
}).$mount('#app')
