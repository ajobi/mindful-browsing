import { createApp } from '@vue/runtime-dom/dist/runtime-dom.esm-bundler.js'
import Warning from '../../vue/components/warning/Warning.vue'
import store from '../../vue/store'

const app = createApp(Warning)

app.use(store)
app.mount('#app')
