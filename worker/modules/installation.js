// eslint-disable-next-line no-unused-vars
import { settingsDevelopment, settingsProduction } from '../utils/settings'

const withDefaults = settings => {
  for (const key of Object.keys(settings.userSettings)) {
    settings.userSettings[key].value = settings.userSettings[key].default
  }

  return settings
}

export const install = callback => {
  chrome.storage.sync.set(withDefaults(settingsDevelopment), () => {
    // installationLog.log(`Installed with ${initialSettings.targetEnv} settings.`)

    if (callback) {
      callback()
    }
  })
}

chrome.runtime.onInstalled.addListener(() => {
  install(() => chrome.tabs.create({ url: 'chrome://newtab/' }))
})
