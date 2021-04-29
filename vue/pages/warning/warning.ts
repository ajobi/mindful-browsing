// @ts-nocheck
import { createApp } from '@vue/runtime-dom/dist/runtime-dom.esm-bundler.js'
import Warning from '../../components/warning/Warning.vue'
import store from '../../store'
import './../../css/main.css'

const app = createApp(Warning)

app.use(store)
app.mount('#app')
