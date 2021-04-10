import { Message } from '../../../interface/messages.interface'
import { ActionContext, ActionTree, GetterTree, Module } from 'vuex'
import { State } from '../index'
import { domainNameRegex, domainNameFromUrl } from '../../utils/domain'

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

export type Actions = {
  [ActionTypes.SET_ACTIVE_TASK]: (context: ActionContext<void, State>, payload: string) => void,
  [ActionTypes.ADD_BLOCKED_DOMAIN]: (context: ActionContext<void, State>, payload: string) => void,
  [ActionTypes.REMOVE_BLOCKED_DOMAIN]: (context: ActionContext<void, State>, payload: string) => void,
  [ActionTypes.CANCEL_REMOVAL]: (context: ActionContext<void, State>, payload: string) => void,
  [ActionTypes.DELETE_BLOCKED_DOMAIN]: (context: ActionContext<void, State>, payload: string) => void,
  [ActionTypes.SET_ACTIVE_MECHANISM]: (context: ActionContext<void, State>, payload: string) => void,
  [ActionTypes.SET_BREATH_COUNT]: (context: ActionContext<void, State>, payload: number) => void,
  [ActionTypes.SET_CHALLENGE_DIFFICULTY]: (context: ActionContext<void, State>, payload: number) => void,
  [ActionTypes.SET_SOUNDS_ALLOWED]: (context: ActionContext<void, State>, payload: boolean) => void,
  [ActionTypes.SET_NOTIFICATION_INTERVAL]: (context: ActionContext<void, State>, payload: number) => void,
}

const actions: ActionTree<void, State> & Actions = {
  [ActionTypes.SET_ACTIVE_TASK] ({ rootState }, activeTask) {
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
  [ActionTypes.SET_ACTIVE_MECHANISM] (context, activeMechanism) {
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
  [ActionTypes.SET_SOUNDS_ALLOWED] (context, soundsAllowed) {
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
