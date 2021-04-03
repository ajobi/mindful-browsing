import { createStore } from 'vuex'
import settings from './modules/settings'
import backgroundAPI from './modules/backgroundAPI'
import warning from './modules/warning'

const store = createStore({
  modules: {
    backgroundAPI,
    settings,
    warning
  }
})

store.dispatch('backgroundAPI/init')
store.dispatch('warning/init')

export default store
