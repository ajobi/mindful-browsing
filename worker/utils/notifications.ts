import { getNamedLogger } from './logger'
import { getUserSettings } from './storage'
import { SettingsKey } from '../../interface/settings.interface'

const notificationsLog = getNamedLogger('NOTIFICATIONS', 'purple')

const image = 'assets/logo/logo-128.png'
// TODO: Fix problems with Audio in Service Worker
// const tickSound = new Audio('assets/sounds/tick.mp3')
const soundTimeout = 200

export const basicNotification = (title: string, message: string, withSound: boolean): void => {
  chrome.notifications.create(
    { type: 'basic', iconUrl: image, title: title, message: message },
    () => {
      notificationsLog.log(`Notification created: ${title} ${message}`)

      if (getUserSettings(SettingsKey.SoundsAllowed) && withSound) {
        // setTimeout(() => tickSound.play(), soundTimeout)
      }
    }
  )
}
