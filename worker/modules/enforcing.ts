import { basicNotification } from '../utils/notifications'
import { format } from '../utils/time'
import { getNamedLogger } from '../utils/logger'
import { getUserSettings } from '../utils/storage'
import { isForbidden, isOfDomain } from '../utils/url'
import { Message } from '../../interface/messages.interface'
import { checkUrl } from './monitoring'
import { BlockedDomain, SettingsKey } from '../../interface/settings.interface'
import TabChangeInfo = chrome.tabs.TabChangeInfo;

let countdown: NodeJS.Timeout

const enforcingLog = getNamedLogger('ENFORCING', 'green')

const onNotificationClicked = (notificationId: string) => {
  chrome.tabs.query({}, tabs => {
    const forbiddenIds: number[] = []

    for (const tab of tabs) {
      for (const blockedDomain of getUserSettings(SettingsKey.BlockedDomains)) {
        if (isOfDomain(tab.url ?? '', blockedDomain.name)) {
          tab.id && forbiddenIds.push(tab.id)
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
    if (!isForbidden(tabs[0].url ?? '')) {
      chrome.tabs.query({}, tabs => {
        for (const tab of tabs) {
          for (const blockedDomain of getUserSettings(SettingsKey.BlockedDomains)) {
            if (isOfDomain(tab.url ?? '', blockedDomain.name)) {
              chrome.tabs.update(tab.id ?? -1, { selected: true })
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

  let counter = getUserSettings(SettingsKey.NotificationInterval)
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      counter = getUserSettings(SettingsKey.NotificationInterval)
    }
  }, 1000)
}

const stopDisciplineEnforcement = () => {
  enforcingLog.log('Browsing discipline enforcement stopped.')

  chrome.notifications.onClicked.removeListener(onNotificationClicked)
  clearInterval(countdown)
}

export const checkTabsOnUpdate = (tabId: number, changeInfo: TabChangeInfo): void => {
  if (!changeInfo.url) {
    return
  }

  checkTabsOnRemoved()
}

const checkTabsOnRemoved = () => {
  chrome.tabs.onRemoved.removeListener(checkTabsOnRemoved)
  chrome.tabs.query({}, tabs => {
    for (const tab of tabs) {
      if (isForbidden(tab.url ?? '')) {
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

chrome.runtime.onMessage.addListener(({ id, data }) => {
  if (id === Message.BlockedTabAction) {
    if (data.action === Message.BlockedTabCancel) {
      chrome.tabs.update(data.tabId, { url: 'chrome://newtab/' })
    } else if (data.action === Message.BlockedTabProceed && data.targetUrl) {
      grantException()
      chrome.tabs.update(data.tabId, { url: data.targetUrl })
    }
  }
})
