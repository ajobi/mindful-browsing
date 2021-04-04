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
      if (id === 'STORAGE_UPDATED') {
        commit('setStorage', storage)
        console.log(storage)
      }
    })
  }
}

const getters = {
  getStorage (state) {
    return state.storage
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
