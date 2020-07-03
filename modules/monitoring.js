const MONITORING = (function () {
  const monitoringLog = LOGGER.getNamedLogger('MONITORING', 'indianred')

  const _feedWarningTab = tabId => {
    chrome.tabs.sendMessage(tabId, {
      id: 'BLOCKED_TAB_FEED',
      data: { tabId: tabId, targetUrl: STORE.getters.getTargetUrl(tabId) }
    })
  }

  const _openWarning = tab => {
    chrome.tabs.update(tab.id, { url: 'layout/warning/warning.html' }, () => {
      chrome.tabs.onUpdated.addListener(function warningLoaded (tabId, changeInfo) {
        if (tabId === tab.id && changeInfo.status === 'complete') {
          STORE.mutations.addWarningTab(tab)
          _feedWarningTab(tabId)
          chrome.tabs.onUpdated.removeListener(warningLoaded)
        }
      })
    })
  }

  function checkUrl (tabId, { url }, tab) {
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
      _openWarning(tab)
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
      _feedWarningTab(tabId)
    }

    if (STORE.getters.isWarningTab(tabId) && changeInfo.url) {
      STORE.mutations.removeWarningTab(tabId)
    }
  })

  return {
    checkUrl
  }
})()
