import { Message } from '../../../../interface/messages.interface'
import { ActionTree, Module, MutationTree } from 'vuex'
import { State } from '../../index'
import { Actions, ActionTypes, Mutations, MutationTypes, StateStorage } from './interface'

const state: StateStorage = {
  storage: null
}

const mutations: MutationTree<StateStorage> & Mutations = {
  [MutationTypes.SET_STORAGE] (state, payload) {
    state.storage = payload
  }
}

const actions: ActionTree<StateStorage, State> & Actions = {
  [ActionTypes.INIT] ({ commit }) {
    chrome.runtime.onMessage.addListener(({ id, storage }) => {
      if (id === Message.StorageUpdated) {
        commit(MutationTypes.SET_STORAGE, storage)
      }
    })

    chrome.runtime.sendMessage({ id: Message.StorageUpdateRequest })
  }
}

const module: Module<StateStorage, State> = {
  namespaced: true,
  state,
  actions,
  mutations
}

export default module
