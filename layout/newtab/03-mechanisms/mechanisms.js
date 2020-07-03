const MECHANISM_BREATHING = SETTINGS_MECHANISM.querySelector('#mechanism_breathing')
const MECHANISM_CHALLENGE = SETTINGS_MECHANISM.querySelector('#mechanism_challenge')

MECHANISM_BREATHING.addEventListener('click', () => {
  if (backgroundAPI.SETTINGS.getters.getActiveMechanism() !== 'breathing') {
    backgroundAPI.SETTINGS.mutations.setActiveMechanism('breathing')
  }
})

MECHANISM_CHALLENGE.addEventListener('click', () => {
  if (backgroundAPI.SETTINGS.getters.getActiveMechanism() !== 'challenge') {
    backgroundAPI.SETTINGS.mutations.setActiveMechanism('challenge')
  }
})

function setActiveMechanism (mechanismId) {
  MECHANISM_BREATHING.classList.remove('mechanism--active')
  MECHANISM_CHALLENGE.classList.remove('mechanism--active')

  if (MECHANISM_BREATHING.id === mechanismId) {
    MECHANISM_BREATHING.classList.add('mechanism--active')
  }

  if (MECHANISM_CHALLENGE.id === mechanismId) {
    MECHANISM_CHALLENGE.classList.add('mechanism--active')
  }
}

function loadMechanismSettings () {
  const activeMechanism = backgroundAPI.SETTINGS.getters.getActiveMechanism()

  switch (activeMechanism) {
    case 'breathing':
      setActiveMechanism('mechanism_breathing')
      break
    case 'challenge':
      setActiveMechanism('mechanism_challenge')
      break
  }

  MECHANISM_BREATHING.querySelector(
    'span'
  ).innerText = backgroundAPI.SETTINGS.getters.getBreathCount()
  MECHANISM_CHALLENGE.querySelector(
    'span'
  ).innerText = backgroundAPI.SETTINGS.getters.getChallengeDifficulty()
}

MECHANISM_BREATHING.querySelector('button').addEventListener('click', () => {
  const breathCount = prompt('Enter the number of breaths:')

  if (breathCount === null) {
  	return
  }

  if (!backgroundAPI.VALIDATORS.validators.validateBreathCount(breathCount)) {
    alert(backgroundAPI.VALIDATORS.errorMessages.errorBreathCount(breathCount))
    return
  }

  backgroundAPI.SETTINGS.mutations.setBreathCount(breathCount)
})

MECHANISM_CHALLENGE.querySelector('button').addEventListener('click', () => {
  const challengeDifficulty = prompt('Enter the number of characters:')

  if (challengeDifficulty === null) {
    return
  }

  if (!backgroundAPI.VALIDATORS.validators.validateChallengeDifficulty(challengeDifficulty)) {
    alert(backgroundAPI.VALIDATORS.errorMessages.errorChallengeDifficulty(challengeDifficulty))
    return
  }

  backgroundAPI.SETTINGS.mutations.setChallengeDifficulty(challengeDifficulty)
})
