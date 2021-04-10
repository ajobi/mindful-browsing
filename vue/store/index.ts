import { createStore } from 'vuex'
import storage, { ActionTypes as StorageActions, StateStorage } from './modules/storage'
import newtab from './modules/newtab'

export type State = {
  storage: StateStorage,
  newtab: never
}

const store = createStore<State>({
  modules: {
    storage,
    newtab
  }
})

store.dispatch(StorageActions.INIT)

export default store
