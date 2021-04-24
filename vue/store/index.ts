// TODO: Implement proper store typing
import { createStore } from 'vuex'
import { ActionTypes as StorageActions, StateStorage } from './modules/storage/interface'
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

store.dispatch(`storage/${StorageActions.INIT}`)

export default store
