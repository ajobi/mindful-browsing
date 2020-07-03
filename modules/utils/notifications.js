const NOTIFICATIONS = (function () {
  const notificationsLog = LOGGER.getNamedLogger('NOTIFICATIONS', 'purple')

  const image = 'assets/logo/logo-128.png'
  const tickSound = new Audio('assets/sounds/tick.mp3')
  const soundTimeout = 200

  function basicNotification (title, message, withSound) {
    chrome.notifications.create(
      { type: 'basic', iconUrl: image, title: title, message: message },
      () => {
        notificationsLog.log(`Notification created: ${title} ${message}`)

        if (SETTINGS.getters.getSoundsAllowed() && withSound) {
          setTimeout(() => tickSound.play(), soundTimeout)
        }
      }
    )
  }

  return {
    basicNotification
  }
})()
