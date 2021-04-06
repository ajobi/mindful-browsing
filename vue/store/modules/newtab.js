import { Message } from '../../../interface/messages.interface'

// const _getSettings = (settings) => JSON.parse(JSON.stringify(settings))

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

    chrome.runtime.sendMessage({ id: Message.SetActiveTask, value: activeTask })
  },
  addBlockedDomain ({ rootState }, domainName) {
    if (!domainNameRegex.test(domainName)) {
      alert(`Unfortunately, "${domainName}" is not a valid domain name!`)
      return
    }

    const blockedDomains = rootState.storage.storage?.userSettings?.blockedDomains
    const pureDomainName = domainNameFromUrl(domainName)

    if (blockedDomains.find(domain => domain.name === pureDomainName)) {
      alert(`It seems like the "${pureDomainName}" is already in the list!`)
      return
    }

    const newValue = [...blockedDomains, { name: pureDomainName, removeTimestamp: null }]
    chrome.runtime.sendMessage({ id: Message.SetBlockedDomains, value: newValue })
  },
  removeBlockedDomain ({ rootState }, domainName) {
    const blockedDomains = rootState.storage.storage?.userSettings?.blockedDomains
    const newValue = [...blockedDomains]
    const targetDomain = newValue.find(domain => domain.name === domainName)
    targetDomain.removeTimestamp = (new Date()).valueOf() + (rootState.storage.storage?.extensionSettings.removeDelay * 1000)
    chrome.runtime.sendMessage({ id: Message.SetBlockedDomains, value: newValue })
  },
  cancelRemoval ({ rootState }, domainName) {
    const blockedDomains = rootState.storage.storage?.userSettings?.blockedDomains
    const newValue = [...blockedDomains]
    const targetDomain = newValue.find(domain => domain.name === domainName)
    targetDomain.removeTimestamp = null
    chrome.runtime.sendMessage({ id: Message.SetBlockedDomains, value: newValue })
  },
  deleteBlockedDomain ({ rootState }, domainName) {
    const blockedDomains = rootState.storage.storage?.userSettings?.blockedDomains
    const newValue = [...blockedDomains].filter(domain => domain.name !== domainName)
    chrome.runtime.sendMessage({ id: Message.SetBlockedDomains, value: newValue })
  },
  setActiveMechanism ({ rootState }, activeMechanism) {
    chrome.runtime.sendMessage({ id: Message.SetActiveMechanism, value: activeMechanism })
  },
  setBreathCount ({ rootState }, breathCount) {
    const { minValue, maxValue } = rootState.storage.storage?.extensionSettings?.validators?.breathCount

    if (!Number.isInteger(breathCount) || breathCount < minValue || breathCount > maxValue) {
      alert(`Unfortunately, "${breathCount}" is not a valid number of breaths! Please pick a number of breaths between ${minValue} and ${maxValue}!`)
      return
    }

    chrome.runtime.sendMessage({ id: Message.SetBreathCount, value: breathCount })
  },
  setChallengeDifficulty ({ rootState }, challengeDifficulty) {
    const { minValue, maxValue } = rootState.storage.storage?.extensionSettings?.validators?.challengeDifficulty

    if (!Number.isInteger(challengeDifficulty) || challengeDifficulty < minValue || challengeDifficulty > maxValue) {
      alert(`Unfortunately, "${challengeDifficulty}" is not a valid challenge text length! Please pick a length between ${minValue} and ${maxValue} characters!`)
      return
    }

    chrome.runtime.sendMessage({ id: Message.SetChallengeDifficulty, value: challengeDifficulty })
  },
  setSoundsAllowed ({ rootState }, soundsAllowed) {
    chrome.runtime.sendMessage({ id: Message.SetSoundsAllowed, value: soundsAllowed })
  },
  setNotificationInterval ({ rootState }, notificationInterval) {
    const { minValue, maxValue } = rootState.storage.storage?.extensionSettings?.validators?.notificationInterval

    if (!Number.isInteger(notificationInterval) || notificationInterval < minValue || notificationInterval > maxValue) {
      alert(`Unfortunately, "${notificationInterval}" is not a valid notification interval! Please pick an interval length between ${minValue} and ${maxValue} seconds!`)
      return
    }

    chrome.runtime.sendMessage({ id: Message.SetNotificationInterval, value: notificationInterval })
  }
}

const getters = {
  getActiveTask: (state, getters, rootState) => rootState.storage.storage?.userSettings?.activeTask,
  getBlockedDomains: (state, getters, rootState) => rootState.storage.storage?.userSettings?.blockedDomains,
  getActiveMechanism: (state, getters, rootState) => rootState.storage.storage?.userSettings?.activeMechanism,
  getBreathCount: (state, getters, rootState) => rootState.storage.storage?.userSettings?.breathCount,
  getChallengeDifficulty: (state, getters, rootState) => rootState.storage.storage?.userSettings?.challengeDifficulty,
  getNotificationInterval: (state, getters, rootState) => rootState.storage.storage?.userSettings?.notificationInterval,
  getSoundsAllowed: (state, getters, rootState) => rootState.storage.storage?.userSettings?.soundsAllowed
}

export default {
  namespaced: true,
  actions,
  getters
}
