// eslint-disable-next-line no-unused-vars
import { settingsDevelopment, settingsProduction } from '../settings'

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set(settingsDevelopment, () => {
    chrome.tabs.create({ url: 'chrome://newtab/' })
  })
})
