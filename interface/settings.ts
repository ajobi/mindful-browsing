import { ExtensionSettings } from './settings.interface'

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
    activeTask: {
      value: 'to finish this extension!',
      default: 'to finish this extension!'
    },
    blockedDomains: {
      value: [
        { name: 'twitter.com', removeTimestamp: null },
        { name: 'quora.com', removeTimestamp: null },
        { name: 'youtube.com', removeTimestamp: null }
      ],
      default: [
        { name: 'twitter.com', removeTimestamp: null },
        { name: 'quora.com', removeTimestamp: null },
        { name: 'youtube.com', removeTimestamp: null }
      ]
    },
    soundsAllowed: {
      value: false,
      default: false
    },
    notificationInterval: {
      value: 10,
      default: 10
    },
    activeMechanism: {
      value: 'breathing',
      default: 'breathing'
    },
    breathCount: {
      value: 1,
      default: 1
    },
    challengeDifficulty: {
      value: 10,
      default: 10
    }
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
    activeTask: {
      value: 'not to procrastinate!',
      default: 'not to procrastinate!'
    },
    blockedDomains: {
      value: [],
      default: []
    },
    soundsAllowed: {
      value: false,
      default: false
    },
    notificationInterval: {
      value: 30,
      default: 30
    },
    activeMechanism: {
      value: 'challenge',
      default: 'challenge'
    },
    breathCount: {
      value: 3,
      default: 3
    },
    challengeDifficulty: {
      value: 50,
      default: 50
    }
  }
}
