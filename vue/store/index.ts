import { createStore, Module } from 'vuex'
import storage, { ActionTypes, StateStorage } from './modules/storage'
import newtab from './modules/newtab'

export type State = {
  storage: Module<StateStorage, State>,
}

const store = createStore<State>({
  modules: {
    storage,
    newtab
  }
})

store.dispatch(ActionTypes.INIT)

export default store
