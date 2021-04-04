import { createStore } from 'vuex'
import storage from './modules/storage'
import newtab from './modules/newtab'
import warning from './modules/warning'

const store = createStore({
  modules: {
    storage,
    newtab,
    warning
  }
})

store.dispatch('storage/init')
store.dispatch('warning/init')

export default store
