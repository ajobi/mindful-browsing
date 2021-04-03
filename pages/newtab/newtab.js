import { createApp } from '@vue/runtime-dom/dist/runtime-dom.esm-bundler.js'
import NewTab from '../../vue/components/newtab/NewTab.vue'
import store from '../../vue/store'

const app = createApp(NewTab)

app.use(store)
app.mount('#app')
