import { Message } from '../../../interface/messages.interface'
import { ActionTree, GetterTree, Module } from 'vuex'
import { State } from '../index'

// eslint-disable-next-line prefer-regex-literals
const domainNameRegex = new RegExp(
  '^((?:http(?:s)?:\\/\\/)?(?:www\\.)?)(?:([A-Za-z0-9][A-Za-z0-9-]{0,61}[A-Za-z0-9])\\.)*([A-Za-z0-9]{2,20})'
)

function domainNameFromUrl (url: string) {
  const match = domainNameRegex.exec(url)
  return match ? `${match[2]}.${match[3]}` : null
}

export enum ActionTypes {
  SET_ACTIVE_TASK = 'SET_ACTIVE_TASK',
  ADD_BLOCKED_DOMAIN = 'ADD_BLOCKED_DOMAIN',
  REMOVE_BLOCKED_DOMAIN = 'REMOVE_BLOCKED_DOMAIN',
  CANCEL_REMOVAL = 'CANCEL_REMOVAL',
  DELETE_BLOCKED_DOMAIN = 'DELETE_BLOCKED_DOMAIN',
  SET_ACTIVE_MECHANISM = 'SET_ACTIVE_MECHANISM',
  SET_BREATH_COUNT = 'SET_BREATH_COUNT',
  SET_CHALLENGE_DIFFICULTY = 'SET_CHALLENGE_DIFFICULTY',
  SET_SOUNDS_ALLOWED = 'SET_SOUNDS_ALLOWED',
  SET_NOTIFICATION_INTERVAL = 'SET_NOTIFICATION_INTERVAL',
}

const actions: ActionTree<void, State> = {
  [ActionTypes.SET_ACTIVE_TASK] ({ rootState }, activeTask: string) {
    if (!rootState.storage.storage) {
      return
    }

    const { minValue, maxValue } = rootState.storage.storage.extensionSettings.validators.activeTask

    if (activeTask.length < minValue || activeTask.length > maxValue) {
      alert(`Your task description must be between ${minValue} and ${maxValue} characters long!`)
      return
    }

    chrome.runtime.sendMessage({ id: Message.SetActiveTask, value: activeTask })
  },
  [ActionTypes.ADD_BLOCKED_DOMAIN] ({ rootState }, domainName) {
    if (!rootState.storage.storage) {
      return
    }

    if (!domainNameRegex.test(domainName)) {
      alert(`Unfortunately, "${domainName}" is not a valid domain name!`)
      return
    }

    const blockedDomains = rootState.storage.storage.userSettings.blockedDomains
    const pureDomainName = domainNameFromUrl(domainName)

    if (blockedDomains.find(domain => domain.name === pureDomainName)) {
      alert(`It seems like the "${pureDomainName}" is already in the list!`)
      return
    }

    const newValue = [...blockedDomains, { name: pureDomainName, removeTimestamp: null }]
    chrome.runtime.sendMessage({ id: Message.SetBlockedDomains, value: newValue })
  },
  [ActionTypes.REMOVE_BLOCKED_DOMAIN] ({ rootState }, domainName) {
    if (!rootState.storage.storage) {
      return
    }

    const blockedDomains = rootState.storage.storage.userSettings.blockedDomains
    const newValue = [...blockedDomains]
    const targetDomain = newValue.find(domain => domain.name === domainName)

    if (targetDomain) {
      targetDomain.removeTimestamp = (new Date()).valueOf() + (rootState.storage.storage.extensionSettings.removeDelay * 1000)
      chrome.runtime.sendMessage({ id: Message.SetBlockedDomains, value: newValue })
    }
  },
  [ActionTypes.CANCEL_REMOVAL] ({ rootState }, domainName) {
    if (!rootState.storage.storage) {
      return
    }

    const blockedDomains = rootState.storage.storage.userSettings.blockedDomains
    const newValue = [...blockedDomains]
    const targetDomain = newValue.find(domain => domain.name === domainName)

    if (targetDomain) {
      targetDomain.removeTimestamp = null
      chrome.runtime.sendMessage({ id: Message.SetBlockedDomains, value: newValue })
    }
  },
  [ActionTypes.DELETE_BLOCKED_DOMAIN] ({ rootState }, domainName) {
    if (!rootState.storage.storage) {
      return
    }

    const blockedDomains = rootState.storage.storage.userSettings.blockedDomains
    const newValue = [...blockedDomains].filter(domain => domain.name !== domainName)
    chrome.runtime.sendMessage({ id: Message.SetBlockedDomains, value: newValue })
  },
  [ActionTypes.SET_ACTIVE_MECHANISM] ({ rootState }, activeMechanism) {
    chrome.runtime.sendMessage({ id: Message.SetActiveMechanism, value: activeMechanism })
  },
  [ActionTypes.SET_BREATH_COUNT] ({ rootState }, breathCount) {
    if (!rootState.storage.storage) {
      return
    }

    const { minValue, maxValue } = rootState.storage.storage.extensionSettings.validators.breathCount

    if (!Number.isInteger(breathCount) || breathCount < minValue || breathCount > maxValue) {
      alert(`Unfortunately, "${breathCount}" is not a valid number of breaths! Please pick a number of breaths between ${minValue} and ${maxValue}!`)
      return
    }

    chrome.runtime.sendMessage({ id: Message.SetBreathCount, value: breathCount })
  },
  [ActionTypes.SET_CHALLENGE_DIFFICULTY] ({ rootState }, challengeDifficulty) {
    if (!rootState.storage.storage) {
      return
    }

    const { minValue, maxValue } = rootState.storage.storage.extensionSettings.validators.challengeDifficulty

    if (!Number.isInteger(challengeDifficulty) || challengeDifficulty < minValue || challengeDifficulty > maxValue) {
      alert(`Unfortunately, "${challengeDifficulty}" is not a valid challenge text length! Please pick a length between ${minValue} and ${maxValue} characters!`)
      return
    }

    chrome.runtime.sendMessage({ id: Message.SetChallengeDifficulty, value: challengeDifficulty })
  },
  [ActionTypes.SET_SOUNDS_ALLOWED] ({ rootState }, soundsAllowed) {
    chrome.runtime.sendMessage({ id: Message.SetSoundsAllowed, value: soundsAllowed })
  },
  [ActionTypes.SET_NOTIFICATION_INTERVAL] ({ rootState }, notificationInterval) {
    if (!rootState.storage.storage) {
      return
    }

    const { minValue, maxValue } = rootState.storage.storage.extensionSettings.validators.notificationInterval

    if (!Number.isInteger(notificationInterval) || notificationInterval < minValue || notificationInterval > maxValue) {
      alert(`Unfortunately, "${notificationInterval}" is not a valid notification interval! Please pick an interval length between ${minValue} and ${maxValue} seconds!`)
      return
    }

    chrome.runtime.sendMessage({ id: Message.SetNotificationInterval, value: notificationInterval })
  }
}

const getters: GetterTree<void, State> = {
  getActiveTask: (state, getters, rootState) => rootState.storage.storage?.userSettings.activeTask,
  getBlockedDomains: (state, getters, rootState) => rootState.storage.storage?.userSettings.blockedDomains,
  getActiveMechanism: (state, getters, rootState) => rootState.storage.storage?.userSettings.activeMechanism,
  getBreathCount: (state, getters, rootState) => rootState.storage.storage?.userSettings.breathCount,
  getChallengeDifficulty: (state, getters, rootState) => rootState.storage.storage?.userSettings.challengeDifficulty,
  getNotificationInterval: (state, getters, rootState) => rootState.storage.storage?.userSettings.notificationInterval,
  getSoundsAllowed: (state, getters, rootState) => rootState.storage.storage?.userSettings.soundsAllowed
}

const module: Module<void, State> = {
  namespaced: true,
  actions,
  getters
}

export default module
