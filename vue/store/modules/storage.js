import { Message } from '../../../interface/messages'

const state = () => ({
  storage: null
})

const mutations = {
  setStorage (state, storage) {
    state.storage = storage
  }
}

const actions = {
  init ({ commit }) {
    chrome.runtime.onMessage.addListener(({ id, storage }) => {
      if (id === Message.StorageUpdated) {
        commit('setStorage', storage)
        console.log(storage)
      }
    })

    chrome.runtime.sendMessage({ id: Message.StorageUpdateRequest })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
