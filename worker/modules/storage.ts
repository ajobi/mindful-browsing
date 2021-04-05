import { updateUserSettings } from '../utils/storage'
import { SettingsKey } from '../../interface/settings.interface'
import { Message } from '../../interface/messages'

chrome.storage.sync.get(null, storage => {
  chrome.runtime.sendMessage({ id: Message.StorageUpdated, storage })
})

chrome.storage.onChanged.addListener(() => {
  chrome.storage.sync.get(null, storage => {
    chrome.runtime.sendMessage({ id: Message.StorageUpdated, storage })
  })
})

chrome.runtime.onMessage.addListener(({ id }) => {
  if (id === Message.StorageUpdateRequest) {
    chrome.storage.sync.get(null, storage => {
      chrome.runtime.sendMessage({ id: Message.StorageUpdated, storage })
    })
  }
})

chrome.runtime.onMessage.addListener(({ id, value }) => {
  if (id === Message.SetActiveTask) {
    updateUserSettings(SettingsKey.ActiveTask, value)
    return
  }

  if (id === Message.SetBlockedDomains) {
    updateUserSettings(SettingsKey.BlockedDomains, value)
    return
  }

  if (id === Message.SetActiveMechanism) {
    updateUserSettings(SettingsKey.ActiveMechanism, value)
    return
  }

  if (id === Message.SetBreathCount) {
    updateUserSettings(SettingsKey.BreathCount, value)
    return
  }

  if (id === Message.SetChallengeDifficulty) {
    updateUserSettings(SettingsKey.ChallengeDifficulty, value)
    return
  }

  if (id === Message.SetSoundsAllowed) {
    updateUserSettings(SettingsKey.SoundsAllowed, value)
    return
  }

  if (id === Message.SetNotificationInterval) {
    updateUserSettings(SettingsKey.NotificationInterval, value)
  }
})
