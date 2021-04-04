import { MESSAGE_ID_STORAGE_UPDATE_REQUEST, MESSAGE_ID_STORAGE_UPDATED } from '../utils/message'

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
