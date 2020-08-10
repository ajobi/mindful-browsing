const URL = (function () {
  const domainNameRegex = new RegExp(
    '^((?:http(?:s)?:\\/\\/)?(?:www\\.)?)(?:([A-Za-z0-9][A-Za-z0-9-]{0,61}[A-Za-z0-9])\\.)*([A-Za-z0-9]{2,20})'
  )

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
    for (const blockedDomain of window.backgroundAPI.SETTINGS.getters.getBlockedDomains()) {
      if (isOfDomain(url, blockedDomain.name)) {
        return true
      }
    }
    return false
  }

  function domainNameFromUrl (url) {
    const match = domainNameRegex.exec(url)
    return `${match[2]}.${match[3]}`
  }

  return {
    domainNameRegex,
    isNewTab,
    isExtensionUrl,
    isOfDomain,
    isForbidden,
    domainNameFromUrl
  }
})()
