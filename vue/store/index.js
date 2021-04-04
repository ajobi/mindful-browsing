import { createStore } from 'vuex'
import settings from './modules/settings'
import backgroundAPI from './modules/backgroundAPI'
import warning from './modules/warning'
import storage from './modules/storage'

const store = createStore({
  modules: {
    backgroundAPI,
    settings,
    warning,
    storage
  }
})

store.dispatch('storage/init')
store.dispatch('backgroundAPI/init')
store.dispatch('warning/init')

export default store
