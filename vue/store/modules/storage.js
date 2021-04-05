import {
  MESSAGE_ID_STORAGE_UPDATED,
  MESSAGE_ID_STORAGE_UPDATE_REQUEST
} from '../../../interface/messages'

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
      if (id === MESSAGE_ID_STORAGE_UPDATED) {
        commit('setStorage', storage)
        console.log(storage)
      }
    })

    chrome.runtime.sendMessage({ id: MESSAGE_ID_STORAGE_UPDATE_REQUEST })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
