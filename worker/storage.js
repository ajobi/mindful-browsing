chrome.storage.onChanged.addListener(() => {
  chrome.storage.sync.get(null, storage => {
    chrome.runtime.sendMessage({ id: 'STORAGE_UPDATED', storage })
  })
})

chrome.runtime.onMessage.addListener(({ id }) => {
  if (id === 'STORAGE_UPDATE_REQUEST') {
    chrome.storage.sync.get(null, storage => {
      chrome.runtime.sendMessage({ id: 'STORAGE_UPDATED', storage })
    })
  }
})
