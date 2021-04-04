import { getNamedLogger } from '../utils/logger'

const settingsLog = getNamedLogger('SETTINGS', 'gray')

let settings = null // core data object

const load = () => new Promise((resolve, reject) =>
  chrome.storage.sync.get(null, storageItems => {
    settingsLog.log('New settings loaded.')
    settings = storageItems
    resolve()
  }))

const getters = {
  areSettingsLoaded () {
    return !!settings
  },
  getSettings () {
    return settings
  },
  getActiveTask () {
    return settings.userSettings.activeTask.value
  },
  getBlockedDomains () {
    return settings.userSettings.blockedDomains.value
  },
  getNotificationInterval () {
    return settings.userSettings.notificationInterval.value
  },
  getSoundsAllowed () {
    return settings.userSettings.soundsAllowed.value
  },
  getActiveMechanism () {
    return settings.userSettings.activeMechanism.value
  },
  getBreathCount () {
    return settings.userSettings.breathCount.value
  },
  getChallengeDifficulty () {
    return settings.userSettings.challengeDifficulty.value
  }
}

chrome.storage.onChanged.addListener(load)

// needed in case chrome is opened without newtab
if (!getters.areSettingsLoaded()) {
  load()
}

export const SETTINGS = {
  load,
  getters
}
