import {
  MESSAGE_ID_STORAGE_UPDATED,
  MESSAGE_ID_STORAGE_UPDATE_REQUEST,
  MESSAGE_ID_SET_ACTIVE_TASK,
  MESSAGE_ID_ADD_BLOCKED_DOMAIN,
  MESSAGE_ID_REMOVE_BLOCKED_DOMAIN,
  MESSAGE_ID_CANCEL_REMOVAL,
  MESSAGE_ID_DELETE_BLOCKED_DOMAIN,
  MESSAGE_ID_SET_ACTIVE_MECHANISM,
  MESSAGE_ID_SET_BREATH_COUNT,
  MESSAGE_ID_SET_CHALLENGE_DIFFICULTY, MESSAGE_ID_SET_SOUNDS_ALLOWED, MESSAGE_ID_SET_NOTIFICATION_INTERVAL
} from '../../../utils/message'

const domainNameRegex = new RegExp(
  '^((?:http(?:s)?:\\/\\/)?(?:www\\.)?)(?:([A-Za-z0-9][A-Za-z0-9-]{0,61}[A-Za-z0-9])\\.)*([A-Za-z0-9]{2,20})'
)

function domainNameFromUrl (url) {
  const match = domainNameRegex.exec(url)
  return `${match[2]}.${match[3]}`
}

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
  },
  setActiveTask ({ state }, activeTask) {
    const { minValue, maxValue } = state.storage?.extensionSettings?.validators?.activeTask

    if (activeTask.length < minValue || activeTask > maxValue) {
      alert(`Your task description must be between ${minValue} and ${maxValue} characters long!`)
      return
    }

    chrome.runtime.sendMessage({ id: MESSAGE_ID_SET_ACTIVE_TASK, value: activeTask })
  },
  addBlockedDomain ({ state }, domainName) {
    if (!domainNameRegex.test(domainName)) {
      alert(`Unfortunately, "${domainName}" is not a valid domain name!`)
      return
    }

    const blockedDomains = state.storage?.userSettings?.blockedDomains?.value
    if (blockedDomains.find(domain => domain.name === domainNameFromUrl(domainName))) {
      alert(`It seems like the "${window.backgroundAPI.URL.domainNameFromUrl(domainName)}" is already in the list!`)
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
    const { minValue, maxValue } = state.storage?.extensionSettings?.validators?.breathCount

    if (!Number.isInteger(breathCount) || breathCount < minValue || breathCount > maxValue) {
      alert(`Unfortunately, "${breathCount}" is not a valid number of breaths! Please pick a number of breaths between ${minValue} and ${maxValue}!`)
      return
    }

    chrome.runtime.sendMessage({ id: MESSAGE_ID_SET_BREATH_COUNT, value: breathCount })
  },
  setChallengeDifficulty ({ state }, challengeDifficulty) {
    const { minValue, maxValue } = state.storage?.extensionSettings?.validators?.challengeDifficulty

    if (!Number.isInteger(challengeDifficulty) || challengeDifficulty < minValue || challengeDifficulty > maxValue) {
      alert(`Unfortunately, "${challengeDifficulty}" is not a valid challenge text length! Please pick a length between ${minValue} and ${maxValue} characters!`)
      return
    }

    chrome.runtime.sendMessage({ id: MESSAGE_ID_SET_CHALLENGE_DIFFICULTY, value: challengeDifficulty })
  },
  setSoundsAllowed ({ state }, soundsAllowed) {
    chrome.runtime.sendMessage({ id: MESSAGE_ID_SET_SOUNDS_ALLOWED, value: soundsAllowed })
  },
  setNotificationInterval ({ state }, notificationInterval) {
    const { minValue, maxValue } = state.storage?.extensionSettings?.validators?.notificationInterval

    if (!Number.isInteger(notificationInterval) || notificationInterval < minValue || notificationInterval > maxValue) {
      alert(`Unfortunately, "${notificationInterval}" is not a valid notification interval! Please pick an interval length between ${minValue} and ${maxValue} seconds!`)
      return
    }

    chrome.runtime.sendMessage({ id: MESSAGE_ID_SET_NOTIFICATION_INTERVAL, value: notificationInterval })
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
