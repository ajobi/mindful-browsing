import { getUserSettings } from './storage'
import { SettingsKey } from '../../interface/settings.interface'

export const isNewTab = (url: string): boolean => url === 'chrome://newtab/'

export const isExtensionUrl = (url: string): boolean => url.startsWith('chrome-extension://')

export const isOfDomain = (url: string, domain: string): boolean =>
  new RegExp(`^((?:http(?:s)?:\\/\\/)?(?:www\\.)?)(?:([A-Za-z0-9][A-Za-z0-9-]{0,61}[A-Za-z0-9])\\.)*${domain}(\\/.*)?`).test(url)

export const isForbidden = (url: string): boolean => {
  for (const blockedDomain of getUserSettings(SettingsKey.BlockedDomains)) {
    if (isOfDomain(url, blockedDomain.name)) {
      return true
    }
  }
  return false
}
