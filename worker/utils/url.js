import { SETTINGS } from '../modules/settings'
import { getUserSettings } from '../modules/storage'

function isNewTab (url) {
  return url === 'chrome://newtab/'
}

function isExtensionUrl (url) {
  return url.startsWith('chrome-extension://')
}

function isOfDomain (url, domain) {
  return new RegExp(`^((?:http(?:s)?:\\/\\/)?(?:www\\.)?)(?:([A-Za-z0-9][A-Za-z0-9-]{0,61}[A-Za-z0-9])\\.)*${domain}(\\/.*)?`).test(url)
}

function isForbidden (url) {
  for (const blockedDomain of getUserSettings('blockedDomains')) {
    if (isOfDomain(url, blockedDomain.name)) {
      return true
    }
  }
  return false
}

export const URL = {
  isNewTab,
  isExtensionUrl,
  isOfDomain,
  isForbidden
}
