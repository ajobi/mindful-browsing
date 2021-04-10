import { ExtensionSettings } from '../interface/settings.interface'

export const settingsDevelopment: ExtensionSettings = {
  extensionSettings: {
    removeDelay: 10,
    validators: {
      activeTask: {
        minValue: 3,
        maxValue: 70
      },
      notificationInterval: {
        minValue: 10,
        maxValue: 600
      },
      breathCount: {
        minValue: 1,
        maxValue: 10
      },
      challengeDifficulty: {
        minValue: 5,
        maxValue: 80
      }
    }
  },
  userSettings: {
    activeTask: 'to finish this extension!',
    blockedDomains: [
      { name: 'twitter.com', removeTimestamp: null },
      { name: 'quora.com', removeTimestamp: null },
      { name: 'youtube.com', removeTimestamp: null }
    ],
    soundsAllowed: false,
    notificationInterval: 10,
    activeMechanism: 'breathing',
    breathCount: 1,
    challengeDifficulty: 10
  }
}

export const settingsProduction: ExtensionSettings = {
  extensionSettings: {
    removeDelay: (60 * 30), // 30 minutes
    validators: {
      activeTask: {
        minValue: 3,
        maxValue: 70
      },
      notificationInterval: {
        minValue: 10,
        maxValue: 600
      },
      breathCount: {
        minValue: 3,
        maxValue: 10
      },
      challengeDifficulty: {
        minValue: 40,
        maxValue: 80
      }
    }
  },
  userSettings: {
    activeTask: 'not to procrastinate!',
    blockedDomains: [],
    soundsAllowed: false,
    notificationInterval: 30,
    activeMechanism: 'challenge',
    breathCount: 3,
    challengeDifficulty: 50
  }
}
