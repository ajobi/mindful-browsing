import { getChallengeString } from '../../utils/utils.string'

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
  initiateBreathing ({ commit, rootState, state }) {
    rootState.backgroundAPI.backgroundAPI.STORE.mutations.initiateBreathing(state.tabId)
    commit('setBreathing', 'initiated')

    breathingTimeout = setTimeout(() => {
      rootState.backgroundAPI.backgroundAPI.STORE.mutations.finishBreathing(state.tabId)
      commit('setBreathing', 'success')
    }, 1000 * rootState.backgroundAPI.backgroundAPI.SETTINGS.getters.getBreathCount() * 8)
  },
  initiateChallenge ({ commit, rootState }) {
    commit('setChallenge', 'initiated')

    // CHALLENGE.style.display = 'block'
    // CHALLENGE_STRING.innerText = getChallengeString(rootState.backgroundAPI.SETTINGS.getters.getChallengeDifficulty())
    // CHALLENGE_INPUT.focus()
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
