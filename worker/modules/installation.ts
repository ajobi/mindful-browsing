// @ts-nocheck
// eslint-disable-next-line no-unused-vars
import { settingsDevelopment, settingsProduction } from '../../interface/settings'

export const install = callback => {
  chrome.storage.sync.set(settingsDevelopment, () => {
    // installationLog.log(`Installed with ${initialSettings.targetEnv} settings.`)

    if (callback) {
      callback()
    }
  })
}

chrome.runtime.onInstalled.addListener(() => {
  install(() => chrome.tabs.create({ url: 'chrome://newtab/' }))
})
