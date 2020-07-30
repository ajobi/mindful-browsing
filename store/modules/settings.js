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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
