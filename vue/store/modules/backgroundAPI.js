import {
  MESSAGE_ID_ADD_BLOCKED_DOMAIN,
  MESSAGE_ID_CANCEL_REMOVAL,
  MESSAGE_ID_DELETE_BLOCKED_DOMAIN,
  MESSAGE_ID_REMOVE_BLOCKED_DOMAIN, MESSAGE_ID_SET_ACTIVE_MECHANISM,
  MESSAGE_ID_SET_ACTIVE_TASK,
  MESSAGE_ID_SET_BREATH_COUNT,
  MESSAGE_ID_SET_CHALLENGE_DIFFICULTY, MESSAGE_ID_SET_NOTIFICATION_INTERVAL,
  MESSAGE_ID_SET_SOUNDS_ALLOWED
} from '../../../utils/message'

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
    const { VALIDATORS } = state.backgroundAPI

    if (!VALIDATORS.validators.validateActiveTask(activeTask)) {
      alert(VALIDATORS.errorMessages.errorActiveTask())
      return
    }

    chrome.runtime.sendMessage({ id: MESSAGE_ID_SET_ACTIVE_TASK, value: activeTask })
  },
  addBlockedDomain ({ state }, domainName) {
    const { VALIDATORS } = state.backgroundAPI

    if (!VALIDATORS.validators.validateDomainName(domainName)) {
      alert(VALIDATORS.errorMessages.errorDomainName(domainName))
      return
    }

    if (!VALIDATORS.validators.validateNewDomainName(domainName)) {
      alert(VALIDATORS.errorMessages.errorExistingDomain(domainName))
      return
    }

    chrome.runtime.sendMessage({ id: MESSAGE_ID_ADD_BLOCKED_DOMAIN, value: domainName })
  },
  removeBlockedDomain ({ state }, domainName) {
    chrome.runtime.sendMessage({ id: MESSAGE_ID_REMOVE_BLOCKED_DOMAIN, value: domainName })
  },
  cancelRemoval ({ state }, domainName) {
    chrome.runtime.sendMessage({ id: MESSAGE_ID_CANCEL_REMOVAL, value: domainName })
  },
  deleteBlockedDomain ({ state }, domainName) {
    chrome.runtime.sendMessage({ id: MESSAGE_ID_DELETE_BLOCKED_DOMAIN, value: domainName })
  },
  setActiveMechanism ({ state }, activeMechanism) {
    chrome.runtime.sendMessage({ id: MESSAGE_ID_SET_ACTIVE_MECHANISM, value: activeMechanism })
  },
  setBreathCount ({ state }, breathCount) {
    const { VALIDATORS } = state.backgroundAPI

    if (!VALIDATORS.validators.validateBreathCount(breathCount)) {
      alert(VALIDATORS.errorMessages.errorBreathCount(breathCount))
      return
    }

    chrome.runtime.sendMessage({ id: MESSAGE_ID_SET_BREATH_COUNT, value: breathCount })
  },
  setChallengeDifficulty ({ state }, challengeDifficulty) {
    const { VALIDATORS } = state.backgroundAPI

    if (!VALIDATORS.validators.validateChallengeDifficulty(challengeDifficulty)) {
      alert(VALIDATORS.errorMessages.errorChallengeDifficulty(challengeDifficulty))
      return
    }

    chrome.runtime.sendMessage({ id: MESSAGE_ID_SET_CHALLENGE_DIFFICULTY, value: challengeDifficulty })
  },
  setSoundsAllowed ({ state }, soundsAllowed) {
    chrome.runtime.sendMessage({ id: MESSAGE_ID_SET_SOUNDS_ALLOWED, value: soundsAllowed })
  },
  setNotificationInterval ({ state }, notificationInterval) {
    const { VALIDATORS } = state.backgroundAPI

    if (!VALIDATORS.validators.validateNotificationInterval(notificationInterval)) {
      alert(VALIDATORS.errorMessages.errorNotificationInterval(notificationInterval))
      return
    }
    chrome.runtime.sendMessage({ id: MESSAGE_ID_SET_NOTIFICATION_INTERVAL, value: notificationInterval })
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
