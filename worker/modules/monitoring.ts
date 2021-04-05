import { getNamedLogger } from '../utils/logger'
import { URL } from '../utils/url'
import { Message } from '../../interface/messages'
import Tab = chrome.tabs.Tab;
import TabChangeInfo = chrome.tabs.TabChangeInfo;

const monitoringLog = getNamedLogger('MONITORING', 'indianred')

const openWarning = (tab: Tab, targetUrl: string) => {
  chrome.tabs.update(tab.id ?? -1, { url: 'pages/warning/warning.html' }, () => {
    chrome.tabs.onUpdated.addListener(function warningLoaded (tabId, changeInfo) {
      if (tabId === tab.id && changeInfo.status === 'complete') {
        chrome.tabs.sendMessage(tabId, {
          id: Message.BlockedTabTargetUrl,
          data: { targetUrl }
        })

        chrome.tabs.onUpdated.removeListener(warningLoaded)
      }
    })
  })
}

const checkUrl = (tabId: number, { url }: TabChangeInfo, tab: Tab): void => {
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
