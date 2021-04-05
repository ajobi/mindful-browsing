import { getUserSettings } from './storage'
import { BlockedDomain, SETTINGS_KEY_BLOCKED_DOMAINS } from '../../interface/settings.interface'

const isNewTab = (url: string): boolean => url === 'chrome://newtab/'

const isExtensionUrl = (url: string): boolean => url.startsWith('chrome-extension://')

const isOfDomain = (url: string, domain: string): boolean =>
  new RegExp(`^((?:http(?:s)?:\\/\\/)?(?:www\\.)?)(?:([A-Za-z0-9][A-Za-z0-9-]{0,61}[A-Za-z0-9])\\.)*${domain}(\\/.*)?`).test(url)

function isForbidden (url: string): boolean {
  for (const blockedDomain of (getUserSettings(SETTINGS_KEY_BLOCKED_DOMAINS) as BlockedDomain[])) {
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
