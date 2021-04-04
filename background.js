// TODO: Migrate to Manifest V3 with service worker

import './src/installation.js'
import './src/storage.js'
import { STORE } from './src/store.js'
import { SETTINGS } from './src/settings.js'
import { VALIDATORS } from './src/utils/validators.js'
import { URL } from './src/utils/url.js'
import { ENFORCING } from './src/enforcing'
import { MONITORING } from './src/monitoring'

// expose modules to the internal pages via global object
window.backgroundAPI = { SETTINGS, URL, VALIDATORS, STORE }

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
  if (id === 'BLOCKED_TAB_ACTION') {
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
