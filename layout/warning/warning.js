import Vue from 'vue/dist/vue.runtime.min.js'
import Warning from './components/Warning.vue'

new Vue({
  render: h => h(Warning)
}).$mount('#app')
