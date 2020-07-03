const VALIDATORS = (function() {
  function _isIntegerValue(value) {
    return !isNaN(value) && value % 1 === 0;
  }

  const validators = {
    validateActiveTask(userInput) {
      return (
        userInput.length >= SETTINGS.validators.activeTask.minValue() &&
        userInput.length <= SETTINGS.validators.activeTask.maxValue()
      );
    },
    validateDomainName(userInput) {
      return URL.domainNameRegex.test(userInput);
    },
    validateNewDomainName(userInput) {
      const blockedDomains = SETTINGS.getters.getBlockedDomains();

      return !blockedDomains.find(domain => domain.name === URL.domainNameFromUrl(userInput));
    },
    validateNotificationInterval(userInput) {
      return (
        _isIntegerValue(userInput) &&
        userInput >= SETTINGS.validators.notificationInterval.minValue() &&
        userInput <= SETTINGS.validators.notificationInterval.maxValue()
      );
    },
    validateBreathCount(userInput) {
      return (
        _isIntegerValue(userInput) &&
        userInput >= SETTINGS.validators.breathCount.minValue() &&
        userInput <= SETTINGS.validators.breathCount.maxValue()
      );
    },
    validateChallengeDifficulty(userInput) {
      return (
        _isIntegerValue(userInput) &&
        userInput >= SETTINGS.validators.challengeDifficulty.minValue() &&
        userInput <= SETTINGS.validators.challengeDifficulty.maxValue()
      );
    }
  };

  const errorMessages = {
    errorActiveTask() {
      return `Your task description must be between ${SETTINGS.validators.activeTask.minValue()} and ${SETTINGS.validators.activeTask.maxValue()} characters long!`
    },
    errorDomainName(userInput) {
      return `Unfortunately, "${userInput}" is not a valid domain name!`;
    },
    errorExistingDomain(userInput) {
      return `Seems like the "${URL.domainNameFromUrl(userInput)}" is already in the list!`;
    },
    errorNotificationInterval(userInput) {
      return `Unfortunately, "${userInput}" is not a valid notification interval! Please pick an interval length between ${SETTINGS.validators.notificationInterval.minValue()} and ${SETTINGS.validators.notificationInterval.maxValue()} seconds!`;
    },
    errorBreathCount(userInput) {
      return `Unfortunately, "${userInput}" is not a valid number of breaths! Please pick a number of breaths between ${SETTINGS.validators.breathCount.minValue()} and ${SETTINGS.validators.breathCount.maxValue()}!`;
    },
    errorChallengeDifficulty(userInput) {
      return `Unfortunately, "${userInput}" is not a valid challenge text length! Please pick a length between ${SETTINGS.validators.challengeDifficulty.minValue()} and ${SETTINGS.validators.challengeDifficulty.maxValue()} characters!`;
    }
  };

  return {
    validators,
    errorMessages
  };
})();
