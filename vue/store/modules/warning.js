let breathingTimeout = null

const state = () => ({
  breathing: null,
  challenge: null,
  tabId: null,
  targetUrl: null,
})

const mutations = {
  setBreathing (state, breathing) {
    state.breathing = breathing
  },
  setChallenge (state, challenge) {
    state.challenge = challenge
  },
  setTabId (state, tabId) {
    state.tabId = tabId
  },
  setTargetUrl (state, targetUrl) {
    state.targetUrl = targetUrl
  }
}

const getters = {
  getBreathing (state) {
    return state.breathing
  },
  getChallenge (state) {
    return state.challenge
  },
  getTabId (state) {
    return state.tabId
  },
  getTargetUrl (state) {
    return state.targetUrl
  }
}

const actions = {
  init ({ commit, dispatch, rootState }) {
    // TODO: Might need a cleanup - test what happens when running longer
    chrome.runtime.onMessage.addListener(({ id, data }) => {
        if (id === 'BLOCKED_TAB_FEED') {
          commit('setTabId', data.tabId)
          commit('setTargetUrl', data.targetUrl)

          if (rootState.backgroundAPI.backgroundAPI.STORE.getters.getBreathingStatus(data.tabId)) {
            rootState.backgroundAPI.backgroundAPI.STORE.mutations.resetBreathing(data.tabId)
          }

          return
        }

        if (id === 'INTERRUPT_BREATHING')
          dispatch('interruptBreathing')
      }
    )
  },
  initiateBreathing ({ commit, rootState, state }) {
    rootState.backgroundAPI.backgroundAPI.STORE.mutations.initiateBreathing(state.tabId)
    commit('setBreathing', 'initiated')

    breathingTimeout = setTimeout(() => {
      rootState.backgroundAPI.backgroundAPI.STORE.mutations.finishBreathing(state.tabId)
      commit('setBreathing', 'success')
    }, 1000 * rootState.backgroundAPI.backgroundAPI.SETTINGS.getters.getBreathCount() * 8)
  },
  initiateChallenge ({ commit }) {
    commit('setChallenge', 'initiated')
  },
  interruptBreathing ({ commit, rootState, state }) {
    rootState.backgroundAPI.backgroundAPI.STORE.mutations.interruptBreathing(state.tabId)
    commit('setBreathing', 'interrupted')
    clearTimeout(breathingTimeout)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
