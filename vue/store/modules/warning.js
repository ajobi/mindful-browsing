const state = () => ({
  breathing: null,
  challenge: null,
})

const mutations = {
  setBreathing (state, breathing) {
    state.breathing = breathing
  }
}

const getters = {
  getBreathing (state) {
    return state.breathing
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
