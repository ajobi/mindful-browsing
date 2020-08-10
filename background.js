import './src/installation.js'
import {
  startDisciplineEnforcement,
  stopDisciplineEnforcement,
  checkTabsOnUpdate,
  checkTabsOnRemoved,
  interruptBreathingTabs
} from './src/enforcing.js'
import {
  checkUrl
} from './src/monitoring.js'
import { STORE } from './src/store.js'
import { SETTINGS } from './src/settings.js'
import { VALIDATORS } from './src/utils/validators.js'
import { URL } from './src/utils/url.js'

// expose modules to the internal pages via global object
window.backgroundAPI = { SETTINGS, URL, VALIDATORS, STORE }

chrome.tabs.onUpdated.addListener(checkUrl)
chrome.runtime.onMessage.addListener(onMessage)
chrome.storage.onChanged.addListener(SETTINGS.load)

// needed in case chrome is opened without newtab
if (!SETTINGS.getters.areSettingsLoaded()) {
  SETTINGS.load()
}

chrome.tabs.onActivated.addListener(interruptBreathingTabs)
chrome.windows.onFocusChanged.addListener(interruptBreathingTabs)

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

function grantException () {
  chrome.tabs.onUpdated.removeListener(checkUrl)
  chrome.tabs.onUpdated.addListener(checkTabsOnUpdate)
  chrome.tabs.onRemoved.addListener(checkTabsOnRemoved)
  startDisciplineEnforcement()
}

function removeException () {
  chrome.tabs.onUpdated.addListener(checkUrl)
  chrome.tabs.onUpdated.removeListener(checkTabsOnUpdate)
  chrome.tabs.onRemoved.removeListener(checkTabsOnRemoved)
  stopDisciplineEnforcement()
}
