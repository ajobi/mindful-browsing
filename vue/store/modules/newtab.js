import {
  MESSAGE_ID_SET_ACTIVE_TASK,
  MESSAGE_ID_ADD_BLOCKED_DOMAIN,
  MESSAGE_ID_REMOVE_BLOCKED_DOMAIN,
  MESSAGE_ID_CANCEL_REMOVAL,
  MESSAGE_ID_DELETE_BLOCKED_DOMAIN,
  MESSAGE_ID_SET_ACTIVE_MECHANISM,
  MESSAGE_ID_SET_BREATH_COUNT,
  MESSAGE_ID_SET_CHALLENGE_DIFFICULTY, MESSAGE_ID_SET_SOUNDS_ALLOWED, MESSAGE_ID_SET_NOTIFICATION_INTERVAL
} from '../../../utils/message'

// eslint-disable-next-line prefer-regex-literals
const domainNameRegex = new RegExp(
  '^((?:http(?:s)?:\\/\\/)?(?:www\\.)?)(?:([A-Za-z0-9][A-Za-z0-9-]{0,61}[A-Za-z0-9])\\.)*([A-Za-z0-9]{2,20})'
)

function domainNameFromUrl (url) {
  const match = domainNameRegex.exec(url)
  return `${match[2]}.${match[3]}`
}

const actions = {
  setActiveTask ({ rootState }, activeTask) {
    const { minValue, maxValue } = rootState.storage.storage?.extensionSettings?.validators?.activeTask

    if (activeTask.length < minValue || activeTask > maxValue) {
      alert(`Your task description must be between ${minValue} and ${maxValue} characters long!`)
      return
    }

    chrome.runtime.sendMessage({ id: MESSAGE_ID_SET_ACTIVE_TASK, value: activeTask })
  },
  addBlockedDomain ({ rootState }, domainName) {
    if (!domainNameRegex.test(domainName)) {
      alert(`Unfortunately, "${domainName}" is not a valid domain name!`)
      return
    }

    const blockedDomains = rootState.storage.storage?.userSettings?.blockedDomains?.value
    const pureDomainName = domainNameFromUrl(domainName)

    if (blockedDomains.find(domain => domain.name === pureDomainName)) {
      alert(`It seems like the "${pureDomainName}" is already in the list!`)
      return
    }

    chrome.runtime.sendMessage({ id: MESSAGE_ID_ADD_BLOCKED_DOMAIN, value: pureDomainName })
  },
  removeBlockedDomain ({ rootState }, domainName) {
    chrome.runtime.sendMessage({ id: MESSAGE_ID_REMOVE_BLOCKED_DOMAIN, value: domainName })
  },
  cancelRemoval ({ rootState }, domainName) {
    chrome.runtime.sendMessage({ id: MESSAGE_ID_CANCEL_REMOVAL, value: domainName })
  },
  deleteBlockedDomain ({ rootState }, domainName) {
    chrome.runtime.sendMessage({ id: MESSAGE_ID_DELETE_BLOCKED_DOMAIN, value: domainName })
  },
  setActiveMechanism ({ rootState }, activeMechanism) {
    chrome.runtime.sendMessage({ id: MESSAGE_ID_SET_ACTIVE_MECHANISM, value: activeMechanism })
  },
  setBreathCount ({ rootState }, breathCount) {
    const { minValue, maxValue } = rootState.storage.storage?.extensionSettings?.validators?.breathCount

    if (!Number.isInteger(breathCount) || breathCount < minValue || breathCount > maxValue) {
      alert(`Unfortunately, "${breathCount}" is not a valid number of breaths! Please pick a number of breaths between ${minValue} and ${maxValue}!`)
      return
    }

    chrome.runtime.sendMessage({ id: MESSAGE_ID_SET_BREATH_COUNT, value: breathCount })
  },
  setChallengeDifficulty ({ rootState }, challengeDifficulty) {
    const { minValue, maxValue } = rootState.storage.storage?.extensionSettings?.validators?.challengeDifficulty

    if (!Number.isInteger(challengeDifficulty) || challengeDifficulty < minValue || challengeDifficulty > maxValue) {
      alert(`Unfortunately, "${challengeDifficulty}" is not a valid challenge text length! Please pick a length between ${minValue} and ${maxValue} characters!`)
      return
    }

    chrome.runtime.sendMessage({ id: MESSAGE_ID_SET_CHALLENGE_DIFFICULTY, value: challengeDifficulty })
  },
  setSoundsAllowed ({ rootState }, soundsAllowed) {
    chrome.runtime.sendMessage({ id: MESSAGE_ID_SET_SOUNDS_ALLOWED, value: soundsAllowed })
  },
  setNotificationInterval ({ rootState }, notificationInterval) {
    const { minValue, maxValue } = rootState.storage.storage?.extensionSettings?.validators?.notificationInterval

    if (!Number.isInteger(notificationInterval) || notificationInterval < minValue || notificationInterval > maxValue) {
      alert(`Unfortunately, "${notificationInterval}" is not a valid notification interval! Please pick an interval length between ${minValue} and ${maxValue} seconds!`)
      return
    }

    chrome.runtime.sendMessage({ id: MESSAGE_ID_SET_NOTIFICATION_INTERVAL, value: notificationInterval })
  }
}

const getters = {
  getActiveTask: (state, getters, rootState) => rootState.storage.storage?.userSettings?.activeTask?.value,
  getBlockedDomains: (state, getters, rootState) => rootState.storage.storage?.userSettings?.blockedDomains?.value,
  getActiveMechanism: (state, getters, rootState) => rootState.storage.storage?.userSettings?.activeMechanism?.value,
  getBreathCount: (state, getters, rootState) => rootState.storage.storage?.userSettings?.breathCount?.value,
  getChallengeDifficulty: (state, getters, rootState) => rootState.storage.storage?.userSettings?.challengeDifficulty?.value,
  getNotificationInterval: (state, getters, rootState) => rootState.storage.storage?.userSettings?.notificationInterval?.value,
  getSoundsAllowed: (state, getters, rootState) => rootState.storage.storage?.userSettings?.soundsAllowed?.value
}

export default {
  namespaced: true,
  actions,
  getters
}
