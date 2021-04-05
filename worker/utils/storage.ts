import { ExtensionSettings, SettingsKey, SettingsValue } from '../../interface/settings.interface'

let store: ExtensionSettings

chrome.storage.sync.get(null, storage => {
  store = storage as ExtensionSettings
})

chrome.storage.onChanged.addListener(() => {
  chrome.storage.sync.get(null, storage => {
    store = storage as ExtensionSettings
  })
})

// TODO: remove repeated storage reads
export const updateUserSettings = <K extends SettingsKey>(key: K, value: SettingsValue<K>): void => {
  chrome.storage.sync.get(null, storage => {
    storage.userSettings[key].value = value
    chrome.storage.sync.set(storage)
  })
}

export const getUserSettings = <K extends SettingsKey>(key: K): SettingsValue<K> => store.userSettings[key].value
