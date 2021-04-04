import { createStore } from 'vuex'
import warning from './modules/warning'
import storage from './modules/storage'

const store = createStore({
  modules: {
    storage,
    warning
  }
})

store.dispatch('storage/init')
store.dispatch('warning/init')

export default store
