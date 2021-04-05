import { ExtensionSettings, SettingsKey, UserSettingsValue } from '../../interface/settings.interface'

let store: ExtensionSettings | null = null

chrome.storage.sync.get(null, storage => {
  store = storage as ExtensionSettings
})

chrome.storage.onChanged.addListener(() => {
  chrome.storage.sync.get(null, storage => {
    store = storage as ExtensionSettings
  })
})

// TODO: remove repeated storage reads
export const updateUserSettings = (key: SettingsKey, value: UserSettingsValue): void => {
  chrome.storage.sync.get(null, storage => {
    storage.userSettings[key].value = value
    chrome.storage.sync.set(storage)
  })
}

export const getUserSettings = (key: SettingsKey): UserSettingsValue => store?.userSettings[key].value
