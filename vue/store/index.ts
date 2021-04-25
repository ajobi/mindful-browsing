// TODO: Implement proper store typing
import { createStore } from 'vuex'
import { ActionTypes as StorageActions, MODULE_STORAGE, StateStorage } from './modules/storage/interface'
import newtab from './modules/newtab/newtab'
import storage from './modules/storage/storage'

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

store.dispatch(`${MODULE_STORAGE}/${StorageActions.INIT}`)

export default store
