// @ts-nocheck
import { basicNotification } from '../utils/notifications'
import { format } from '../utils/time'
import { getNamedLogger } from '../utils/logger'
import { getUserSettings } from '../utils/storage'
import { URL } from '../utils/url'
import { Message } from '../../interface/messages'
import { MONITORING } from './monitoring'

let countdown

const enforcingLog = getNamedLogger('ENFORCING', 'green')

const onNotificationClicked = notificationId => {
  chrome.tabs.query({}, tabs => {
    const forbiddenIds = []

    for (const tab of tabs) {
      for (const blockedDomain of getUserSettings('blockedDomains')) {
        if (URL.isOfDomain(tab.url, blockedDomain.name)) {
          forbiddenIds.push(tab.id)
        }
      }
    }

    chrome.notifications.clear(notificationId)
    chrome.tabs.remove(forbiddenIds)
    chrome.tabs.create({ url: 'chrome://newtab/' })
  })
}

const redirectToForbiddenTab = () => {
  chrome.tabs.query({ active: true }, tabs => {
    if (!URL.isForbidden(tabs[0].url)) {
      chrome.tabs.query({}, tabs => {
        for (const tab of tabs) {
          for (const blockedDomain of getUserSettings('blockedDomains')) {
            if (URL.isOfDomain(tab.url, blockedDomain.name)) {
              chrome.tabs.update(tab.id, { selected: true })
              return
            }
          }
        }
      })
    }
  })
}

const startDisciplineEnforcement = () => {
  enforcingLog.log('Browsing discipline enforcement started.')

  chrome.notifications.onClicked.addListener(onNotificationClicked)

  let counter = getUserSettings('notificationInterval')
  let secondsSpentOnForbidden = 0

  countdown = setInterval(() => {
    chrome.runtime.sendMessage({ id: 'ENFORCEMENT_KEEP_ALIVE' })
    secondsSpentOnForbidden++
    enforcingLog.log(`Seconds spent on forbidden content: ${secondsSpentOnForbidden}`)

    if (--counter === 0) {
      redirectToForbiddenTab()
      basicNotification(
        'Mindful Browsing',
        `You have already spent ${format(secondsSpentOnForbidden)} on distracting websites!`,
        true
      )
      counter = getUserSettings('notificationInterval')
    }
  }, 1000)
}

const stopDisciplineEnforcement = () => {
  enforcingLog.log('Browsing discipline enforcement stopped.')

  chrome.notifications.onClicked.removeListener(onNotificationClicked)
  clearInterval(countdown)
}

export const checkTabsOnUpdate = (tabId, changeInfo) => {
  if (!changeInfo.url) {
    return
  }

  checkTabsOnRemoved()
}

const checkTabsOnRemoved = () => {
  chrome.tabs.onRemoved.removeListener(checkTabsOnRemoved)
  chrome.tabs.query({}, tabs => {
    for (const tab of tabs) {
      if (URL.isForbidden(tab.url)) {
        chrome.tabs.onRemoved.addListener(checkTabsOnRemoved)
        return
      }
    }

    basicNotification('Mindful Browsing', 'Congratulations! All distracting pages closed!', false)
    removeException()
  })
}

const interruptBreathingTabs = () => {
  chrome.runtime.sendMessage({ id: Message.BlockedTabBreathingInterrupted })
}

chrome.tabs.onActivated.addListener(interruptBreathingTabs)
chrome.windows.onFocusChanged.addListener(interruptBreathingTabs)

function grantException () {
  chrome.tabs.onUpdated.removeListener(MONITORING.checkUrl)
  chrome.tabs.onUpdated.addListener(checkTabsOnUpdate)
  chrome.tabs.onRemoved.addListener(checkTabsOnRemoved)
  startDisciplineEnforcement()
}

function removeException () {
  chrome.tabs.onUpdated.addListener(MONITORING.checkUrl)
  chrome.tabs.onUpdated.removeListener(checkTabsOnUpdate)
  chrome.tabs.onRemoved.removeListener(checkTabsOnRemoved)
  stopDisciplineEnforcement()
}

chrome.runtime.onMessage.addListener(onMessage)

function onMessage ({ id, data }) {
  if (id === Message.BlockedTabAction) {
    if (data.action === Message.BlockedTabCancel) {
      chrome.tabs.update(data.tabId, { url: 'chrome://newtab/' })
    } else if (data.action === Message.BlockedTabProceed && data.targetUrl) {
      grantException()
      chrome.tabs.update(data.tabId, { url: data.targetUrl })
    }
  }
}
