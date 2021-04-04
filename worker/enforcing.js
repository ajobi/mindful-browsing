import { basicNotification } from './utils/notifications.js'
import { format } from './utils/time.js'
import { getNamedLogger } from './utils/logger'
import { removeException } from './index'

let countdown

const enforcingLog = getNamedLogger('ENFORCING', 'green')

const onNotificationClicked = notificationId => {
  chrome.tabs.query({}, tabs => {
    const forbiddenIds = []

    for (const tab of tabs) {
      for (const blockedDomain of window.backgroundAPI.SETTINGS.getters.getBlockedDomains()) {
        if (window.backgroundAPI.URL.isOfDomain(tab.url, blockedDomain.name)) {
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
    if (!window.backgroundAPI.URL.isForbidden(tabs[0].url)) {
      chrome.tabs.query({}, tabs => {
        for (const tab of tabs) {
          for (const blockedDomain of window.backgroundAPI.SETTINGS.getters.getBlockedDomains()) {
            if (window.backgroundAPI.URL.isOfDomain(tab.url, blockedDomain.name)) {
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

  let counter = window.backgroundAPI.SETTINGS.getters.getNotificationInterval()
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
      counter = window.backgroundAPI.SETTINGS.getters.getNotificationInterval()
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
      if (window.backgroundAPI.URL.isForbidden(tab.url)) {
        chrome.tabs.onRemoved.addListener(checkTabsOnRemoved)
        return
      }
    }

    basicNotification('Mindful Browsing', 'Congratulations! All distracting pages closed!', false)
    removeException()
  })
}

const interruptBreathingTabs = () => {
  for (const tab of window.backgroundAPI.STORE.getters.getBreathingTabs()) {
    chrome.tabs.sendMessage(tab.tabId, {
      id: 'INTERRUPT_BREATHING',
      data: null
    })
  }
}

export const ENFORCING = {
  startDisciplineEnforcement,
  stopDisciplineEnforcement,
  checkTabsOnUpdate,
  checkTabsOnRemoved,
  interruptBreathingTabs
}