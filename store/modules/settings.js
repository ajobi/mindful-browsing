const state = () => ({
  settings: null
})

const mutations = {
  setSettings (state, settings) {
    state.settings = settings
  }
}

const actions = {
  init ({ dispatch }, backgroundAPI) {
    const loadSettings = () => {
      dispatch('load', backgroundAPI)
    }

    backgroundAPI.SETTINGS.onSettingsChanged.addListener(loadSettings)
    window.addEventListener('unload', () => {
      backgroundAPI.SETTINGS.onSettingsChanged.removeListener(loadSettings)
    })

    loadSettings()
  },
  load ({ commit }, backgroundAPI) {
    commit('setSettings', backgroundAPI.SETTINGS.getters.getSettings())
  }
}

const getters = {
  getActiveTask (state) {
    return state.settings && state.settings.userSettings.activeTask.value
  },
  getBlockedDomains (state) {
    return state.settings && state.settings.userSettings.blockedDomains.value
  },
  getActiveMechanism (state) {
    return state.settings && state.settings.userSettings.activeMechanism.value
  },
  getBreathCount (state) {
    return state.settings && state.settings.userSettings.breathCount.value
  },
  getChallengeDifficulty (state) {
    return state.settings && state.settings.userSettings.challengeDifficulty.value
  },
  getNotificationInterval (state) {
    return state.settings && state.settings.userSettings.notificationInterval.value
  },
  getSoundsAllowed (state) {
    return state.settings && state.settings.userSettings.soundsAllowed.value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
