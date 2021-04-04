import { getNamedLogger } from './logger'
import { getUserSettings } from './storage'

const notificationsLog = getNamedLogger('NOTIFICATIONS', 'purple')

const image = 'assets/logo/logo-128.png'
const tickSound = new Audio('assets/sounds/tick.mp3')
const soundTimeout = 200

export const basicNotification = (title, message, withSound) => {
  chrome.notifications.create(
    { type: 'basic', iconUrl: image, title: title, message: message },
    () => {
      notificationsLog.log(`Notification created: ${title} ${message}`)

      if (getUserSettings('soundsAllowed') && withSound) {
        setTimeout(() => tickSound.play(), soundTimeout)
      }
    }
  )
}
