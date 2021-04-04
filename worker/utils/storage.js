let store = null

chrome.storage.sync.get(null, storage => {
  store = storage
})

chrome.storage.onChanged.addListener(() => {
  chrome.storage.sync.get(null, storage => {
    store = storage
  })
})

// TODO: remove repeated storage reads
export const updateUserSettings = (key, value) => {
  chrome.storage.sync.get(null, storage => {
    storage.userSettings[key].value = value
    chrome.storage.sync.set(storage)
  })
}

export const updateWarningTabs = (value) => {
  chrome.storage.sync.get(null, storage => {
    storage.warningTabs = value
    chrome.storage.sync.set(storage)
  })
}

export const getWarningTabs = () => store.warningTabs

export const getUserSettings = (key) => store.userSettings[key].value
