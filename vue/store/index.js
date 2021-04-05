import { createStore } from 'vuex'
import storage from './modules/storage'
import newtab from './modules/newtab'

const store = createStore({
  modules: {
    storage,
    newtab
  }
})

store.dispatch('storage/init')

export default store
