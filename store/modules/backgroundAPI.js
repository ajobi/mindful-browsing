const state = () => ({
  backgroundAPI: null
})

const mutations = {
  setBackgroundAPI (state, backgroundAPI) {
    state.backgroundAPI = backgroundAPI
  }
}

const actions = {
  init ({ commit, dispatch }) {
    chrome.runtime.getBackgroundPage(backgroundGlobal => {
      commit('setBackgroundAPI', backgroundGlobal.backgroundAPI)

      const loadSettings = () => {
        dispatch('settings/load', backgroundGlobal.backgroundAPI, { root: true })
      }

      backgroundGlobal.backgroundAPI.SETTINGS.onSettingsChanged.addListener(loadSettings)
      window.addEventListener('unload', () => {
        backgroundGlobal.backgroundAPI.SETTINGS.onSettingsChanged.removeListener(loadSettings)
      })

      loadSettings()
    })
  }
}

const getters = {
  getBackgroundAPI (state) {
    return state.backgroundAPI
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
