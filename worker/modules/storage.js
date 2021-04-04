import { SETTINGS } from './settings'
import { STORE } from './store'
import {
  MESSAGE_ID_ADD_BLOCKED_DOMAIN,
  MESSAGE_ID_CANCEL_REMOVAL,
  MESSAGE_ID_DELETE_BLOCKED_DOMAIN,
  MESSAGE_ID_FINISH_BREATHING,
  MESSAGE_ID_INITIATE_BREATHING,
  MESSAGE_ID_INTERRUPT_BREATHING,
  MESSAGE_ID_REMOVE_BLOCKED_DOMAIN,
  MESSAGE_ID_SET_ACTIVE_MECHANISM,
  MESSAGE_ID_SET_ACTIVE_TASK, MESSAGE_ID_SET_BLOCKED_DOMAINS,
  MESSAGE_ID_SET_BREATH_COUNT,
  MESSAGE_ID_SET_CHALLENGE_DIFFICULTY,
  MESSAGE_ID_SET_NOTIFICATION_INTERVAL,
  MESSAGE_ID_SET_SOUNDS_ALLOWED,
  MESSAGE_ID_STORAGE_UPDATE_REQUEST,
  MESSAGE_ID_STORAGE_UPDATED
} from '../../messages'

chrome.storage.onChanged.addListener(() => {
  chrome.storage.sync.get(null, storage => {
    chrome.runtime.sendMessage({ id: MESSAGE_ID_STORAGE_UPDATED, storage })
  })
})

chrome.runtime.onMessage.addListener(({ id }) => {
  if (id === MESSAGE_ID_STORAGE_UPDATE_REQUEST) {
    chrome.storage.sync.get(null, storage => {
      chrome.runtime.sendMessage({ id: MESSAGE_ID_STORAGE_UPDATED, storage })
    })
  }
})

const updateUserSettings = (key, value) => {
  chrome.storage.sync.get(null, storage => {
    storage.userSettings[key].value = value
    chrome.storage.sync.set(storage)
  })
}

chrome.runtime.onMessage.addListener(({ id, value }) => {
  if (id === MESSAGE_ID_SET_ACTIVE_TASK) {
    updateUserSettings('activeTask', value)
    return
  }

  if (id === MESSAGE_ID_SET_BLOCKED_DOMAINS) {
    updateUserSettings('blockedDomains', value)
    return
  }

  if (id === MESSAGE_ID_REMOVE_BLOCKED_DOMAIN) {
    SETTINGS.mutations.removeBlockedDomain(value)
    return
  }

  if (id === MESSAGE_ID_CANCEL_REMOVAL) {
    SETTINGS.mutations.cancelRemoval(value)
    return
  }

  if (id === MESSAGE_ID_DELETE_BLOCKED_DOMAIN) {
    SETTINGS.mutations.deleteBlockedDomain(value)
    return
  }

  if (id === MESSAGE_ID_SET_ACTIVE_MECHANISM) {
    updateUserSettings('activeMechanism', value)
    return
  }

  if (id === MESSAGE_ID_SET_BREATH_COUNT) {
    updateUserSettings('breathCount', value)
    return
  }

  if (id === MESSAGE_ID_SET_CHALLENGE_DIFFICULTY) {
    updateUserSettings('challengeDifficulty', value)
    return
  }

  if (id === MESSAGE_ID_SET_SOUNDS_ALLOWED) {
    updateUserSettings('soundsAllowed', value)
    return
  }

  if (id === MESSAGE_ID_SET_NOTIFICATION_INTERVAL) {
    updateUserSettings('notificationInterval', value)
    return
  }

  if (id === MESSAGE_ID_INITIATE_BREATHING) {
    STORE.mutations.initiateBreathing(value)
  }

  if (id === MESSAGE_ID_INTERRUPT_BREATHING) {
    STORE.mutations.interruptBreathing(value)
    return
  }

  if (id === MESSAGE_ID_FINISH_BREATHING) {
    STORE.mutations.finishBreathing(value)
  }
})
