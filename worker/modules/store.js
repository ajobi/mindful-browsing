import { getNamedLogger } from '../utils/logger'
import { getWarningTabs, updateWarningTabs } from '../utils/storage'

const storeLog = getNamedLogger('STORE', 'olive')
const BREATHING_STATUS_INITIATED = 'BREATHING_INITIATED'
const BREATHING_STATUS_INTERRUPTED = 'BREATHING_INTERRUPTED'
const BREATHING_STATUS_FINISHED = 'BREATHING_FINISHED'

const getters = {
  isWarningTab (tabId) {
    return getWarningTabs().some(tab => tab.tabId === tabId)
  },
  getTargetUrl (tabId) {
    return getWarningTabs().find(tab => tab.tabId === tabId).targetUrl
  },
  getBreathingStatus (tabId) {
    return getWarningTabs().find(tab => tab.tabId === tabId).breathingStatus
  },
  getBreathingTabs () {
    return getWarningTabs().filter(tab => tab.breathingStatus === BREATHING_STATUS_INITIATED)
  }
}

const mutations = {
  addWarningTab (tab) {
    storeLog.log(`Warning tab for ${tab.url} added.`)
    updateWarningTabs([...getWarningTabs(), { tabId: tab.id, targetUrl: tab.url, breathingStatus: null }])
  },
  removeWarningTab (tabId) {
    storeLog.log(`Warning tab for ${getters.getTargetUrl(tabId)} removed.`)
    updateWarningTabs(getWarningTabs().filter(tab => tab.tabId !== tabId))
  },
  resetBreathing (tabId) {
    storeLog.log(`Breathing reset for tab ${getters.getTargetUrl(tabId)}.`)
    const newTabs = [...getWarningTabs()]
    newTabs.find(tab => tab.tabId === tabId).breathingStatus = null
    updateWarningTabs(newTabs)
  },
  initiateBreathing (tabId) {
    storeLog.log(`Breathing initiated for tab ${getters.getTargetUrl(tabId)}.`)
    const newTabs = [...getWarningTabs()]
    newTabs.find(tab => tab.tabId === tabId).breathingStatus = BREATHING_STATUS_INITIATED
    updateWarningTabs(newTabs)
  },
  interruptBreathing (tabId) {
    storeLog.log(`Breathing interrupted for tab ${getters.getTargetUrl(tabId)}.`)
    const newTabs = [...getWarningTabs()]
    newTabs.find(tab => tab.tabId === tabId).breathingStatus = BREATHING_STATUS_INTERRUPTED
    updateWarningTabs(newTabs)
  },
  finishBreathing (tabId) {
    storeLog.log(`Breathing finished for tab ${getters.getTargetUrl(tabId)}.`)
    const newTabs = [...getWarningTabs()]
    newTabs.find(tab => tab.tabId === tabId).breathingStatus = BREATHING_STATUS_FINISHED
    updateWarningTabs(newTabs)
  }
}

export const STORE = {
  getters,
  mutations
}
