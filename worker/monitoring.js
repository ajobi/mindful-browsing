import { getNamedLogger } from './utils/logger'
import { STORE } from './store'
import { URL } from './utils/url'

const monitoringLog = getNamedLogger('MONITORING', 'indianred')

const feedWarningTab = tabId => {
  chrome.tabs.sendMessage(tabId, {
    id: 'BLOCKED_TAB_FEED',
    data: { tabId: tabId, targetUrl: STORE.getters.getTargetUrl(tabId) }
  })
}

const openWarning = tab => {
  chrome.tabs.update(tab.id, { url: 'pages/warning/warning.html' }, () => {
    chrome.tabs.onUpdated.addListener(function warningLoaded (tabId, changeInfo) {
      if (tabId === tab.id && changeInfo.status === 'complete') {
        STORE.mutations.addWarningTab(tab)
        feedWarningTab(tabId)
        chrome.tabs.onUpdated.removeListener(warningLoaded)
      }
    })
  })
}

const checkUrl = (tabId, { url }, tab) => {
  if (!url) {
    return
  }

  if (URL.isNewTab(url)) {
    monitoringLog.log(`New URL detected: ${url} (newtab)`)
    return
  }

  if (URL.isExtensionUrl(url)) {
    monitoringLog.log(`New URL detected: ${url} (internal url)`)
    return
  }

  if (URL.isForbidden(url)) {
    monitoringLog.log(`New URL detected: ${url} (forbidden domain)`)
    openWarning(tab)
    return
  }

  monitoringLog.log(`New URL detected: ${url} (allowed domain)`)
}

chrome.tabs.onRemoved.addListener((tabId) => {
  if (STORE.getters.isWarningTab(tabId)) {
    STORE.mutations.removeWarningTab(tabId)
  }
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (STORE.getters.isWarningTab(tabId) && changeInfo.status === 'complete') {
    feedWarningTab(tabId)
  }

  if (STORE.getters.isWarningTab(tabId) && changeInfo.url) {
    STORE.mutations.removeWarningTab(tabId)
  }
})

export const MONITORING = {
  checkUrl
}
