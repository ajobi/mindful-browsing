import { getNamedLogger } from './utils/logger'

const monitoringLog = getNamedLogger('MONITORING', 'indianred')

const feedWarningTab = tabId => {
  chrome.tabs.sendMessage(tabId, {
    id: 'BLOCKED_TAB_FEED',
    data: { tabId: tabId, targetUrl: window.backgroundAPI.STORE.getters.getTargetUrl(tabId) }
  })
}

const openWarning = tab => {
  chrome.tabs.update(tab.id, { url: 'pages/warning/warning.html' }, () => {
    chrome.tabs.onUpdated.addListener(function warningLoaded (tabId, changeInfo) {
      if (tabId === tab.id && changeInfo.status === 'complete') {
        window.backgroundAPI.STORE.mutations.addWarningTab(tab)
        feedWarningTab(tabId)
        chrome.tabs.onUpdated.removeListener(warningLoaded)
      }
    })
  })
}

export const checkUrl = (tabId, { url }, tab) => {
  if (!url) {
    return
  }

  if (window.backgroundAPI.URL.isNewTab(url)) {
    monitoringLog.log(`New URL detected: ${url} (newtab)`)
    return
  }

  if (window.backgroundAPI.URL.isExtensionUrl(url)) {
    monitoringLog.log(`New URL detected: ${url} (internal url)`)
    return
  }

  if (window.backgroundAPI.URL.isForbidden(url)) {
    monitoringLog.log(`New URL detected: ${url} (forbidden domain)`)
    openWarning(tab)
    return
  }

  monitoringLog.log(`New URL detected: ${url} (allowed domain)`)
}

chrome.tabs.onRemoved.addListener((tabId) => {
  if (window.backgroundAPI.STORE.getters.isWarningTab(tabId)) {
    window.backgroundAPI.STORE.mutations.removeWarningTab(tabId)
  }
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (window.backgroundAPI.STORE.getters.isWarningTab(tabId) && changeInfo.status === 'complete') {
    feedWarningTab(tabId)
  }

  if (window.backgroundAPI.STORE.getters.isWarningTab(tabId) && changeInfo.url) {
    window.backgroundAPI.STORE.mutations.removeWarningTab(tabId)
  }
})
