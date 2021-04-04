const state = () => ({
  storage: null
})

const mutations = {
  setStorage (state, storage) {
    state.storage = storage
  }
}

const actions = {
  init () {
    chrome.runtime.onMessage.addListener(message => {
      console.log(message)
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
