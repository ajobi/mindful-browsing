const state = () => ({
  backgroundAPI: null
})

const mutations = {
  setBackgroundAPI (state, backgroundAPI) {
    state.backgroundAPI = backgroundAPI
  }
}

const actions = {
  init ({ commit }) {
    chrome.runtime.getBackgroundPage(backgroundGlobal => {
      commit('setBackgroundAPI', backgroundGlobal.backgroundAPI)
    })
  },
  setActiveTask ({ state }, activeTask) {
    const { VALIDATORS, SETTINGS } = state.backgroundAPI

    if (!VALIDATORS.validators.validateActiveTask(activeTask)) {
      alert(VALIDATORS.errorMessages.errorActiveTask())
      return
    }

    SETTINGS.mutations.setActiveTask(activeTask)
  },
  addBlockedDomain ({ state }, domainName) {
    const { VALIDATORS, SETTINGS, URL } = state.backgroundAPI

    if (!VALIDATORS.validators.validateDomainName(domainName)) {
      alert(VALIDATORS.errorMessages.errorDomainName(domainName))
      return
    }

    if (!VALIDATORS.validators.validateNewDomainName(domainName)) {
      alert(VALIDATORS.errorMessages.errorExistingDomain(domainName))
      return
    }

    SETTINGS.mutations.addBlockedDomain(URL.domainNameFromUrl(domainName))
  },
  removeBlockedDomain ({ state }, domainName) {
    state.backgroundAPI.SETTINGS.mutations.removeBlockedDomain(domainName)
  },
  cancelRemoval ({ state }, domainName) {
    state.backgroundAPI.SETTINGS.mutations.cancelRemoval(domainName)
  },
  deleteBlockedDomain ({ state }, domainName) {
    state.backgroundAPI.SETTINGS.mutations.deleteBlockedDomain(domainName)
  },
  setActiveMechanism ({ state }, activeMechanism) {
    state.backgroundAPI.SETTINGS.mutations.setActiveMechanism(activeMechanism)
  },
  setBreathCount ({ state }, breathCount) {
    const { VALIDATORS, SETTINGS } = state.backgroundAPI

    if (!VALIDATORS.validators.validateBreathCount(breathCount)) {
      alert(VALIDATORS.errorMessages.errorBreathCount(breathCount))
      return
    }

    SETTINGS.mutations.setBreathCount(breathCount)
  },
  setChallengeDifficulty ({ state }, challengeDifficulty) {
    const { VALIDATORS, SETTINGS } = state.backgroundAPI

    if (!VALIDATORS.validators.validateChallengeDifficulty(challengeDifficulty)) {
      alert(VALIDATORS.errorMessages.errorChallengeDifficulty(challengeDifficulty))
      return
    }

    SETTINGS.mutations.setChallengeDifficulty(challengeDifficulty)
  },
  setSoundsAllowed ({ state }, soundsAllowed) {
    state.backgroundAPI.SETTINGS.mutations.setSoundsAllowed(soundsAllowed)
  },
  setNotificationInterval ({ state }, notificationInterval) {
    const { VALIDATORS, SETTINGS } = state.backgroundAPI

    if (!VALIDATORS.validators.validateNotificationInterval(notificationInterval)) {
      alert(VALIDATORS.errorMessages.errorNotificationInterval(notificationInterval))
      return
    }

    SETTINGS.mutations.setNotificationInterval(notificationInterval)
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
