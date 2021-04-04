export const settingsDevelopment = {
  targetEnv: 'development',
  warningTabs: [],
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
      value: null,
      default: 'to finish this extension!'
    },
    blockedDomains: {
      value: null,
      default: [
        { name: 'twitter.com', removeTimestamp: null },
        { name: 'quora.com', removeTimestamp: null },
        { name: 'youtube.com', removeTimestamp: null }
      ]
    },
    soundsAllowed: {
      value: null,
      default: false
    },
    notificationInterval: {
      value: null,
      default: 10
    },
    activeMechanism: {
      value: null,
      default: 'breathing'
    },
    breathCount: {
      value: null,
      default: 1
    },
    challengeDifficulty: {
      value: null,
      default: 10
    }
  }
}

export const settingsProduction = {
  targetEnv: 'production',
  warningTabs: [],
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
      value: null,
      default: 'not to procrastinate!'
    },
    blockedDomains: {
      value: null,
      default: []
    },
    soundsAllowed: {
      value: null,
      default: false
    },
    notificationInterval: {
      value: null,
      default: 30
    },
    activeMechanism: {
      value: null,
      default: 'challenge'
    },
    breathCount: {
      value: null,
      default: 3
    },
    challengeDifficulty: {
      value: null,
      default: 50
    }
  }
}
