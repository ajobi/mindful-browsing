import { getNamedLogger } from '../utils/logger'
import { URL } from '../utils/url'
import { MESSAGE_ID_BLOCKED_TAB_TARGET_URL } from '../../messages'

const monitoringLog = getNamedLogger('MONITORING', 'indianred')

const openWarning = (tab, targetUrl) => {
  chrome.tabs.update(tab.id, { url: 'pages/warning/warning.html' }, () => {
    chrome.tabs.onUpdated.addListener(function warningLoaded (tabId, changeInfo) {
      if (tabId === tab.id && changeInfo.status === 'complete') {
        chrome.tabs.sendMessage(tabId, {
          id: MESSAGE_ID_BLOCKED_TAB_TARGET_URL,
          data: { targetUrl }
        })

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
    openWarning(tab, url)
    return
  }

  monitoringLog.log(`New URL detected: ${url} (allowed domain)`)
}

chrome.tabs.onUpdated.addListener(checkUrl)

export const MONITORING = {
  checkUrl
}
