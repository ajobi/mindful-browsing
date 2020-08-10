function _isIntegerValue (value) {
  return !isNaN(value) && value % 1 === 0
}

const validators = {
  validateActiveTask (userInput) {
    return (
      userInput.length >= window.backgroundAPI.SETTINGS.validators.activeTask.minValue() &&
        userInput.length <= window.backgroundAPI.SETTINGS.validators.activeTask.maxValue()
    )
  },
  validateDomainName (userInput) {
    return window.backgroundAPI.URL.domainNameRegex.test(userInput)
  },
  validateNewDomainName (userInput) {
    const blockedDomains = window.backgroundAPI.SETTINGS.getters.getBlockedDomains()

    return !blockedDomains.find(domain => domain.name === window.backgroundAPI.URL.domainNameFromUrl(userInput))
  },
  validateNotificationInterval (userInput) {
    return (
      _isIntegerValue(userInput) &&
        userInput >= window.backgroundAPI.SETTINGS.validators.notificationInterval.minValue() &&
        userInput <= window.backgroundAPI.SETTINGS.validators.notificationInterval.maxValue()
    )
  },
  validateBreathCount (userInput) {
    return (
      _isIntegerValue(userInput) &&
        userInput >= window.backgroundAPI.SETTINGS.validators.breathCount.minValue() &&
        userInput <= window.backgroundAPI.SETTINGS.validators.breathCount.maxValue()
    )
  },
  validateChallengeDifficulty (userInput) {
    return (
      _isIntegerValue(userInput) &&
        userInput >= window.backgroundAPI.SETTINGS.validators.challengeDifficulty.minValue() &&
        userInput <= window.backgroundAPI.SETTINGS.validators.challengeDifficulty.maxValue()
    )
  }
}

const errorMessages = {
  errorActiveTask () {
    return `Your task description must be between ${window.backgroundAPI.SETTINGS.validators.activeTask.minValue()} and ${window.backgroundAPI.SETTINGS.validators.activeTask.maxValue()} characters long!`
  },
  errorDomainName (userInput) {
    return `Unfortunately, "${userInput}" is not a valid domain name!`
  },
  errorExistingDomain (userInput) {
    return `Seems like the "${window.backgroundAPI.URL.domainNameFromUrl(userInput)}" is already in the list!`
  },
  errorNotificationInterval (userInput) {
    return `Unfortunately, "${userInput}" is not a valid notification interval! Please pick an interval length between ${window.backgroundAPI.SETTINGS.validators.notificationInterval.minValue()} and ${window.backgroundAPI.SETTINGS.validators.notificationInterval.maxValue()} seconds!`
  },
  errorBreathCount (userInput) {
    return `Unfortunately, "${userInput}" is not a valid number of breaths! Please pick a number of breaths between ${window.backgroundAPI.SETTINGS.validators.breathCount.minValue()} and ${window.backgroundAPI.SETTINGS.validators.breathCount.maxValue()}!`
  },
  errorChallengeDifficulty (userInput) {
    return `Unfortunately, "${userInput}" is not a valid challenge text length! Please pick a length between ${window.backgroundAPI.SETTINGS.validators.challengeDifficulty.minValue()} and ${window.backgroundAPI.SETTINGS.validators.challengeDifficulty.maxValue()} characters!`
  }
}

export const VALIDATORS = {
  validators,
  errorMessages
}
