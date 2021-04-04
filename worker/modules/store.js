import { getNamedLogger } from '../utils/logger'

const storeLog = getNamedLogger('STORE', 'olive')

const store = {
  warningTabs: []
}

const BREATHING_STATUS_INITIATED = 'BREATHING_INITIATED'
const BREATHING_STATUS_INTERRUPTED = 'BREATHING_INTERRUPTED'
const BREATHING_STATUS_FINISHED = 'BREATHING_FINISHED'

const getters = {
  isWarningTab (tabId) {
    return store.warningTabs.some(tab => tab.tabId === tabId)
  },
  getTargetUrl (tabId) {
    return store.warningTabs.find(tab => tab.tabId === tabId).targetUrl
  },
  getBreathingStatus (tabId) {
    return store.warningTabs.find(tab => tab.tabId === tabId).breathingStatus
  },
  getBreathingTabs () {
    return store.warningTabs.filter(tab => tab.breathingStatus === BREATHING_STATUS_INITIATED)
  }
}

const mutations = {
  addWarningTab (tab) {
    storeLog.log(`Warning tab for ${tab.url} added.`)
    store.warningTabs.push({ tabId: tab.id, targetUrl: tab.url, breathingStatus: null })
  },
  removeWarningTab (tabId) {
    storeLog.log(`Warning tab for ${getters.getTargetUrl(tabId)} removed.`)
    store.warningTabs = store.warningTabs.filter(tab => tab.tabId !== tabId)
  },
  resetBreathing (tabId) {
    storeLog.log(`Breathing reset for tab ${getters.getTargetUrl(tabId)}.`)
    store.warningTabs.find(tab => tab.tabId === tabId).breathingStatus = null
  },
  initiateBreathing (tabId) {
    storeLog.log(`Breathing initiated for tab ${getters.getTargetUrl(tabId)}.`)
    store.warningTabs.find(tab => tab.tabId === tabId).breathingStatus = BREATHING_STATUS_INITIATED
  },
  interruptBreathing (tabId) {
    storeLog.log(`Breathing interrupted for tab ${getters.getTargetUrl(tabId)}.`)
    store.warningTabs.find(tab => tab.tabId === tabId).breathingStatus = BREATHING_STATUS_INTERRUPTED
  },
  finishBreathing (tabId) {
    storeLog.log(`Breathing finished for tab ${getters.getTargetUrl(tabId)}.`)
    store.warningTabs.find(tab => tab.tabId === tabId).breathingStatus = BREATHING_STATUS_FINISHED
  }
}

export const STORE = {
  getters,
  mutations
}
