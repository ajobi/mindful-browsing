import { createApp } from '@vue/runtime-dom/dist/runtime-dom.esm-bundler.js'
import NewTab from '../../components/newtab/NewTab.vue'
import store from '../../store'

const app = createApp(NewTab)

app.use(store)
app.mount('#app')