const state = () => ({
  settings: null
})

const mutations = {
  setSettings (state, settings) {
    state.settings = settings
  }
}

const actions = {
  load ({ commit }, backgroundAPI) {
    commit('setSettings', backgroundAPI.SETTINGS.getters.getSettings())
  },
  setActiveTask ({ rootState }, activeTask) {
    const { VALIDATORS, SETTINGS } = rootState.backgroundAPI.backgroundAPI

    if (!VALIDATORS.validators.validateActiveTask(activeTask)) {
      alert(VALIDATORS.errorMessages.errorActiveTask())
      return
    }

    SETTINGS.mutations.setActiveTask(activeTask)
  },
  addBlockedDomain ({ rootState }, domainName) {
    const { VALIDATORS, SETTINGS, URL } = rootState.backgroundAPI.backgroundAPI

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
  removeBlockedDomain ({ rootState }, domainName) {
    rootState.backgroundAPI.backgroundAPI.SETTINGS.mutations.removeBlockedDomain(domainName)
  },
  cancelRemoval ({ rootState }, domainName) {
    rootState.backgroundAPI.backgroundAPI.SETTINGS.mutations.cancelRemoval(domainName)
  },
  deleteBlockedDomain ({ rootState }, domainName) {
    rootState.backgroundAPI.backgroundAPI.SETTINGS.mutations.deleteBlockedDomain(domainName)
  },
  setActiveMechanism ({ rootState }, activeMechanism) {
    rootState.backgroundAPI.backgroundAPI.SETTINGS.mutations.setActiveMechanism(activeMechanism)
  },
  setBreathCount ({ rootState }, breathCount) {
    const { VALIDATORS, SETTINGS } = rootState.backgroundAPI.backgroundAPI

    if (!VALIDATORS.validators.validateBreathCount(breathCount)) {
      alert(VALIDATORS.errorMessages.errorBreathCount(breathCount))
      return
    }

    SETTINGS.mutations.setBreathCount(breathCount)
  },
  setChallengeDifficulty ({ rootState }, challengeDifficulty) {
    const { VALIDATORS, SETTINGS } = rootState.backgroundAPI.backgroundAPI

    if (!VALIDATORS.validators.validateChallengeDifficulty(challengeDifficulty)) {
      alert(VALIDATORS.errorMessages.errorChallengeDifficulty(challengeDifficulty))
      return
    }

    SETTINGS.mutations.setChallengeDifficulty(challengeDifficulty)
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
