const CURRENT_TASK_INPUT = SETTINGS_TASK.querySelector('input[type="text"]')

function loadTaskReminder () {
  TASK_REMINDER.innerText = `You have promised ${backgroundAPI.SETTINGS.getters.getActiveTask()}`
  TASK_REMINDER.style.display = 'inline-flex'
  CURRENT_TASK_INPUT.value = ''
}

SETTINGS_TASK.addEventListener('submit', event => {
  event.preventDefault()
  const userInput = CURRENT_TASK_INPUT.value

  if (!backgroundAPI.VALIDATORS.validators.validateActiveTask(userInput)) {
    alert(backgroundAPI.VALIDATORS.errorMessages.errorActiveTask())
    return
  }

  backgroundAPI.SETTINGS.mutations.setActiveTask(userInput)
})
