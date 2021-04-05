import { updateUserSettings } from '../utils/storage'
import { SettingsKey } from '../../interface/settings.interface'
import {
  MESSAGE_ID_SET_ACTIVE_MECHANISM,
  MESSAGE_ID_SET_ACTIVE_TASK,
  MESSAGE_ID_SET_BLOCKED_DOMAINS,
  MESSAGE_ID_SET_BREATH_COUNT,
  MESSAGE_ID_SET_CHALLENGE_DIFFICULTY,
  MESSAGE_ID_SET_NOTIFICATION_INTERVAL,
  MESSAGE_ID_SET_SOUNDS_ALLOWED,
  MESSAGE_ID_STORAGE_UPDATE_REQUEST,
  MESSAGE_ID_STORAGE_UPDATED
} from '../../interface/messages'

chrome.storage.sync.get(null, storage => {
  chrome.runtime.sendMessage({ id: MESSAGE_ID_STORAGE_UPDATED, storage })
})

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
    updateUserSettings(SettingsKey.ActiveTask, value)
    return
  }

  if (id === MESSAGE_ID_SET_BLOCKED_DOMAINS) {
    updateUserSettings(SettingsKey.BlockedDomains, value)
    return
  }

  if (id === MESSAGE_ID_SET_ACTIVE_MECHANISM) {
    updateUserSettings(SettingsKey.ActiveMechanism, value)
    return
  }

  if (id === MESSAGE_ID_SET_BREATH_COUNT) {
    updateUserSettings(SettingsKey.BreathCount, value)
    return
  }

  if (id === MESSAGE_ID_SET_CHALLENGE_DIFFICULTY) {
    updateUserSettings(SettingsKey.ChallengeDifficulty, value)
    return
  }

  if (id === MESSAGE_ID_SET_SOUNDS_ALLOWED) {
    updateUserSettings(SettingsKey.SoundsAllowed, value)
    return
  }

  if (id === MESSAGE_ID_SET_NOTIFICATION_INTERVAL) {
    updateUserSettings(SettingsKey.NotificationInterval, value)
  }
})
