const ADD_DOMAIN_INPUT = SETTINGS_DOMAINS.querySelector('input[type="text"]')

let removeTimeouts = []

function loadBlockedDomains () {
  ADD_DOMAIN_INPUT.value = ''

  for (const interval of removeTimeouts) {
  	clearInterval(interval)
  }
  removeTimeouts = []

  const blocked_domains = backgroundAPI.SETTINGS.getters.getBlockedDomains()

  const blockedDomainsList = SETTINGS_DOMAINS.querySelector('ul')
  blockedDomainsList.innerHTML = ''

  if (blocked_domains.length === 0) {
    const noDomains = document.createElement('p')
    noDomains.innerText = 'No distracting domains yet!'
    blockedDomainsList.appendChild(noDomains)
    return
  }

  for (const blockedDomain of blocked_domains) {
    const listItemNew = document.createElement('li')
    const domainName = document.createElement('span')
    const removeButton = document.createElement('input')
    const cancelRemoveButton = document.createElement('input')
    const removalCountdown = document.createElement('span')

    domainName.innerText = blockedDomain.name

    removeButton.name = blockedDomain.name
    removeButton.type = 'button'
    removeButton.value = 'remove'
    removeButton.classList.add('button--secondary')
    removeButton.addEventListener('click', function () {
      backgroundAPI.SETTINGS.mutations.removeBlockedDomain(this.name)
    })

    cancelRemoveButton.name = blockedDomain.name
    cancelRemoveButton.type = 'button'
    cancelRemoveButton.value = 'cancel'
    cancelRemoveButton.classList.add('button--primary')
    cancelRemoveButton.addEventListener('click', function () {
      backgroundAPI.SETTINGS.mutations.cancelRemoval(this.name)
    })

    if (blockedDomain.removeTimestamp) {
      removeButton.style.display = 'none'
    } else {
      cancelRemoveButton.style.display = 'none'
    }

    removalCountdown.classList.add('removal-countdown')

    if (blockedDomain.removeTimestamp) {
      const currentTime = new Date().valueOf()
      const timeDifferenceInSeconds = (blockedDomain.removeTimestamp - currentTime) / 1000
      removalCountdown.innerText = `in ${backgroundAPI.TIME.format(timeDifferenceInSeconds)}`

      removeTimeouts.push(setInterval(() => {
        const currentTime = new Date().valueOf()
        const timeDifferenceInSeconds = (blockedDomain.removeTimestamp - currentTime) / 1000

        if (timeDifferenceInSeconds > 1) {
          removalCountdown.innerText = `in ${backgroundAPI.TIME.format(timeDifferenceInSeconds)}`
        } else {
          backgroundAPI.SETTINGS.mutations.deleteBlockedDomain(blockedDomain.name)
        }
      }, 1000))
    }

    listItemNew.appendChild(domainName)
    listItemNew.appendChild(removeButton)
    listItemNew.appendChild(cancelRemoveButton)
    listItemNew.appendChild(removalCountdown)

    blockedDomainsList.appendChild(listItemNew)
  }
}

SETTINGS_DOMAINS.addEventListener('submit', event => {
  event.preventDefault()
  addDomainName(ADD_DOMAIN_INPUT.value)
})

function addDomainName (userInput) {
  if (!backgroundAPI.VALIDATORS.validators.validateDomainName(userInput)) {
    alert(backgroundAPI.VALIDATORS.errorMessages.errorDomainName(userInput))
    return
  }

  if (!backgroundAPI.VALIDATORS.validators.validateNewDomainName(userInput)) {
    alert(backgroundAPI.VALIDATORS.errorMessages.errorExistingDomain(userInput))
    return
  }

  backgroundAPI.SETTINGS.mutations.addBlockedDomain(backgroundAPI.URL.domainNameFromUrl(userInput))
}
