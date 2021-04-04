import { MESSAGE_ID_STORAGE_UPDATED, MESSAGE_ID_STORAGE_UPDATE_REQUEST } from '../../../utils/message'

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

const getters = {
  getActiveTask: state => state.storage?.userSettings?.activeTask?.value,
  getBlockedDomains: state => state.storage?.userSettings?.blockedDomains?.value,
  getActiveMechanism: state => state.storage?.userSettings?.activeMechanism?.value,
  getBreathCount: state => state.storage?.userSettings?.breathCount?.value,
  getChallengeDifficulty: state => state.storage?.userSettings?.challengeDifficulty?.value,
  getNotificationInterval: state => state.storage?.userSettings?.notificationInterval?.value,
  getSoundsAllowed: state => state.storage?.userSettings?.soundsAllowed?.value
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
