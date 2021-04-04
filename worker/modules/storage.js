import { SETTINGS } from './settings'
import {
  MESSAGE_ID_ADD_BLOCKED_DOMAIN,
  MESSAGE_ID_CANCEL_REMOVAL,
  MESSAGE_ID_DELETE_BLOCKED_DOMAIN,
  MESSAGE_ID_REMOVE_BLOCKED_DOMAIN,
  MESSAGE_ID_SET_ACTIVE_MECHANISM,
  MESSAGE_ID_SET_ACTIVE_TASK,
  MESSAGE_ID_SET_BREATH_COUNT,
  MESSAGE_ID_SET_CHALLENGE_DIFFICULTY,
  MESSAGE_ID_SET_NOTIFICATION_INTERVAL,
  MESSAGE_ID_SET_SOUNDS_ALLOWED,
  MESSAGE_ID_STORAGE_UPDATE_REQUEST,
  MESSAGE_ID_STORAGE_UPDATED
} from '../../utils/message'

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

chrome.runtime.onMessage.addListener(({ id, value }) => {
  if (id === MESSAGE_ID_SET_ACTIVE_TASK) {
    SETTINGS.mutations.setActiveTask(value)
    return
  }

  if (id === MESSAGE_ID_ADD_BLOCKED_DOMAIN) {
    SETTINGS.mutations.addBlockedDomain(value)
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
    SETTINGS.mutations.setActiveMechanism(value)
    return
  }

  if (id === MESSAGE_ID_SET_BREATH_COUNT) {
    SETTINGS.mutations.setBreathCount(value)
    return
  }

  if (id === MESSAGE_ID_SET_CHALLENGE_DIFFICULTY) {
    SETTINGS.mutations.setChallengeDifficulty(value)
    return
  }

  if (id === MESSAGE_ID_SET_SOUNDS_ALLOWED) {
    SETTINGS.mutations.setSoundsAllowed(value)
    return
  }

  if (id === MESSAGE_ID_SET_NOTIFICATION_INTERVAL) {
    SETTINGS.mutations.setNotificationInterval(value)
  }
})
