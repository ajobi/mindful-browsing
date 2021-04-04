const actions = {
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
  },
  setSoundsAllowed ({ rootState }, soundsAllowed) {
    rootState.backgroundAPI.backgroundAPI.SETTINGS.mutations.setSoundsAllowed(soundsAllowed)
  },
  setNotificationInterval ({ rootState }, notificationInterval) {
    const { VALIDATORS, SETTINGS } = rootState.backgroundAPI.backgroundAPI

    if (!VALIDATORS.validators.validateNotificationInterval(notificationInterval)) {
      alert(VALIDATORS.errorMessages.errorNotificationInterval(notificationInterval))
      return
    }

    SETTINGS.mutations.setNotificationInterval(notificationInterval)
  }
}

export default {
  namespaced: true,
  actions
}
