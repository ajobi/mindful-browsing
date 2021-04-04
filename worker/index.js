// TODO: Migrate to Manifest V3 with service worker
import './installation.js'
import './storage.js'
import { SETTINGS } from './settings.js'
import { ENFORCING } from './enforcing'
import { MONITORING } from './monitoring'
import {
  MESSAGE_ID_BLOCKED_TAB_ACTION,
  MESSAGE_VALUE_BLOCKED_TAB_CANCEL,
  MESSAGE_VALUE_BLOCKED_TAB_PROCEED
} from '../utils/message'

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
    if (data.action === MESSAGE_VALUE_BLOCKED_TAB_CANCEL) {
      chrome.tabs.update(data.tabId, { url: 'chrome://newtab/' })
    } else if (data.action === MESSAGE_VALUE_BLOCKED_TAB_PROCEED && data.targetUrl) {
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
