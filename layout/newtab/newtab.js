document.addEventListener('DOMContentLoaded', onDOMContentLoaded)

let backgroundAPI

function onDOMContentLoaded () {
  chrome.runtime.getBackgroundPage(backgroundGlobal => {
    backgroundAPI = backgroundGlobal.backgroundAPI

    if (!backgroundAPI.SETTINGS.getters.areSettingsLoaded()) {
      backgroundAPI.SETTINGS.load().then(() => {
        initiateNewtab()
      })
    } else {
      initiateNewtab()
    }
  })
}

function initiateNewtab () {
  loadSettings()
  startSlideShow()

  backgroundAPI.SETTINGS.onSettingsChanged.addListener(loadSettings)
  window.addEventListener('unload', () => {
    backgroundAPI.SETTINGS.onSettingsChanged.removeListener(loadSettings)
  })
}

function loadSettings () {
  loadTaskReminder()
  loadBlockedDomains()
  loadNotificationSettings()
  loadMechanismSettings()
}

const TASK_REMINDER = document.getElementById('task_reminder')
const LOGO = document.getElementById('logo')
const QUOTE = document.getElementById('quote')
const SETTINGS_TASK = document.getElementById('settings_task')
const SETTINGS_DOMAINS = document.getElementById('settings_domains')
const SETTINGS_NOTIFICATIONS = document.getElementById('settings_notifications')
const SETTINGS_MECHANISM = document.getElementById('settings_mechanism')

const EMERGE_ANIMATION = '8s linear infinite alternate emerge'

TASK_REMINDER.addEventListener('click', nextLayout)
document.addEventListener('keydown', onKeyDown)

const DISP_0 = 'DISP_0'
const DISP_1 = 'DISP_1'
const DISP_2 = 'DISP_2'
const DISP_3 = 'DISP_3'
const DISP_4 = 'DISP_4'

let SETTINGS_DISPLAY = DISP_0

function onKeyDown (event) {
  const TAB_KEY_CODE = 9
  const ESC_KEY_CODE = 27

  if (event.keyCode === TAB_KEY_CODE) {
    if (SETTINGS_DISPLAY !== DISP_4) {
      event.preventDefault()
    }
    nextLayout()
  }

  if (event.keyCode === ESC_KEY_CODE) {
    displayLayout(DISP_0)
  }
}

function loadQuote () {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
  QUOTE.querySelector('p').innerText = randomQuote.text
  QUOTE.querySelector('span').innerText = randomQuote.author
}

function nextLayout () {
  switch (SETTINGS_DISPLAY) {
    case DISP_0:
      displayLayout(DISP_1)
      break
    case DISP_1:
      displayLayout(DISP_2)
      break
    case DISP_2:
      displayLayout(DISP_3)
      break
    case DISP_3:
      displayLayout(DISP_4)
      break
    case DISP_4:
      displayLayout(DISP_0)
      break
  }
}

function displayLayout (displaySetting) {
  hideAllSettings()
  switch (displaySetting) {
    case DISP_0:
      displayReminderOnly()
      break
    case DISP_1:
      displaySettingsTask()
      break
    case DISP_2:
      displaySettingsDomains()
      break
    case DISP_3:
      displaySettingsMechanism()
      break
    case DISP_4:
      displaySettingsNotifications()
      break
  }
}

function hideAllSettings () {
  LOGO.style.display = 'none'
  QUOTE.style.display = 'none'
  SETTINGS_TASK.style.display = 'none'
  SETTINGS_DOMAINS.style.display = 'none'
  SETTINGS_NOTIFICATIONS.style.display = 'none'
  SETTINGS_MECHANISM.style.display = 'none'
}

function showNextQuote () {
  loadQuote()
  LOGO.style.display = 'none'
  QUOTE.style.display = 'block'
  QUOTE.style.animation = EMERGE_ANIMATION
}

function showLogo () {
  LOGO.style.display = 'block'
  QUOTE.style.display = 'none'
  LOGO.style.animation = EMERGE_ANIMATION
}

let interval

function startSlideShow () {
  const NUMBER_OF_QUOTES = 1

  let counter = 0

  const showNextSlide = () => {
    if (counter === 0) {
      showLogo()
    } else {
      showNextQuote()
    }

    counter = counter < NUMBER_OF_QUOTES ? counter + 1 : 0
  }

  showNextSlide()
  interval = setInterval(showNextSlide, 16000)
}

function stopSlideShow () {
  clearInterval(interval)
  LOGO.style.display = 'none'
  QUOTE.style.display = 'none'
}

function displayReminderOnly () {
  SETTINGS_DISPLAY = DISP_0
  startSlideShow()
}

function displaySettingsTask () {
  stopSlideShow()
  SETTINGS_DISPLAY = DISP_1
  SETTINGS_TASK.style.display = 'block'
  CURRENT_TASK_INPUT.focus()
}

function displaySettingsDomains () {
  SETTINGS_DISPLAY = DISP_2
  SETTINGS_DOMAINS.style.display = 'block'
  ADD_DOMAIN_INPUT.focus()
}

function displaySettingsMechanism () {
  SETTINGS_DISPLAY = DISP_3
  SETTINGS_MECHANISM.style.display = 'block'
}

function displaySettingsNotifications () {
  SETTINGS_DISPLAY = DISP_4
  SETTINGS_NOTIFICATIONS.style.display = 'block'
}
