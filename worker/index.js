// TODO: Migrate to Manifest V3 with service worker
import './installation.js'
import './storage.js'
import { STORE } from './store.js'
import { SETTINGS } from './settings.js'
import { URL } from './utils/url.js'
import { ENFORCING } from './enforcing'
import { MONITORING } from './monitoring'
import { MESSAGE_ID_BLOCKED_TAB_ACTION } from '../utils/message'

// expose modules to the internal pages via global object
window.backgroundAPI = { SETTINGS, URL, STORE }

chrome.tabs.onUpdated.addListener(MONITORING.checkUrl)
chrome.runtime.onMessage.addListener(onMessage)
chrome.storage.onChanged.addListener(SETTINGS.load)

// needed in case chrome is opened without newtab
if (!SETTINGS.getters.areSettingsLoaded()) {
  SETTINGS.load()
}

chrome.tabs.onActivated.addListener(ENFORCING.interruptBreathingTabs)
chrome.windows.onFocusChanged.addListener(ENFORCING.interruptBreathingTabs)

function onMessage ({ id, data }) {
  if (id === MESSAGE_ID_BLOCKED_TAB_ACTION) {
    if (data.action === 'CANCEL') {
      chrome.tabs.update(data.tabId, { url: 'chrome://newtab/' })
    } else if (data.action === 'PROCEED' && data.targetUrl) {
      grantException()
      chrome.tabs.update(data.tabId, { url: data.targetUrl })
    }
  }
}

export function grantException () {
  chrome.tabs.onUpdated.removeListener(MONITORING.checkUrl)
  chrome.tabs.onUpdated.addListener(ENFORCING.checkTabsOnUpdate)
  chrome.tabs.onRemoved.addListener(ENFORCING.checkTabsOnRemoved)
  ENFORCING.startDisciplineEnforcement()
}

export function removeException () {
  chrome.tabs.onUpdated.addListener(MONITORING.checkUrl)
  chrome.tabs.onUpdated.removeListener(ENFORCING.checkTabsOnUpdate)
  chrome.tabs.onRemoved.removeListener(ENFORCING.checkTabsOnRemoved)
  ENFORCING.stopDisciplineEnforcement()
}
