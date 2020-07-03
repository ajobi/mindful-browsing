const INSTALLATION = (function () {
  const installationLog = LOGGER.getNamedLogger('INSTALLATION', 'blue')

  const settingsProduction = {
    targetEnv: 'production',
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

  const settingsDevelopment = {
    targetEnv: 'development',
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
          { name: 'facebook.com', removeTimestamp: null },
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

  function _withDefaults (settings) {
    for (const key of Object.keys(settings.userSettings)) {
      settings.userSettings[key].value = settings.userSettings[key].default
    }

    return settings
  }

  function install (initialSettings, callback) {
    chrome.storage.sync.set(_withDefaults(initialSettings), () => {
      installationLog.log(`Installed with ${initialSettings.targetEnv} settings.`)

      if (callback) {
        callback()
      }
    })
  }

  return {
    settingsProduction,
    settingsDevelopment,
    install
  }
})()
