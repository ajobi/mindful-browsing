<template>
  <div>
    <h1 id="task_reminder" @click="nextView">fsafsaf</h1>
    <PageNewtabLogo v-if="activeView === 0"/>
    <PageNewtabSettingsTask v-if="activeView === 1" :backgroundAPI="backgroundAPI" />
    <PageNewtabSettingsDomains v-if="activeView === 2" :backgroundAPI="backgroundAPI" />
    <PageNewtabSettingsMechanism v-if="activeView === 3" :backgroundAPI="backgroundAPI" />
    <PageNewtabSettingsNotifications v-if="activeView === 4" :backgroundAPI="backgroundAPI" />

    <p id="support_us"><a href="https://www.paypal.me/andrejbilec/5" target="_blank" tabindex="-1"> BUY ME A COFFEE </a></p>
    <span id="focus_anchor" tabindex="1"></span>
  </div>
</template>

<script>
  import PageNewtabLogo from './PageNewtabLogo.vue';
  import PageNewtabSettingsTask from './PageNewtabSettingsTask.vue'
  import PageNewtabSettingsDomains from './PageNewtabSettingsDomains.vue'
  import PageNewtabSettingsMechanism from './PageNewtabSettingsMechanism.vue'
  import PageNewtabSettingsNotifications from './PageNewtabSettingsNotifications.vue'

  export default {
    components: {
      PageNewtabLogo,
      PageNewtabSettingsTask,
      PageNewtabSettingsDomains,
      PageNewtabSettingsMechanism,
      PageNewtabSettingsNotifications
    },
    data () {
      return {
        backgroundAPI: null,
        activeView: 0,
      }
    },
    methods: {
      nextView() {
        this.activeView < 4 ? this.activeView++ : this.activeView = 0
      }
    },
    mounted() {
      const initiateNewtab = () => {
        loadSettings()

        this.backgroundAPI.SETTINGS.onSettingsChanged.addListener(loadSettings)
        window.addEventListener('unload', () => {
          this.backgroundAPI.SETTINGS.onSettingsChanged.removeListener(loadSettings)
        })
      }

      chrome.runtime.getBackgroundPage(backgroundGlobal => {
        this.backgroundAPI = backgroundGlobal.backgroundAPI

        if (!this.backgroundAPI.SETTINGS.getters.areSettingsLoaded()) {
          this.backgroundAPI.SETTINGS.load().then(() => {
            initiateNewtab()
          })
        } else {
          initiateNewtab()
        }
      })

      function loadSettings () {
        // loadTaskReminder()
        // loadBlockedDomains()
        // loadNotificationSettings()
        // loadMechanismSettings()
      }

      // const TASK_REMINDER = document.getElementById('task_reminder')
      // const LOGO = document.getElementById('logo')
      // const QUOTE = document.getElementById('quote')
      // const SETTINGS_TASK = document.getElementById('settings_task')
      // const SETTINGS_DOMAINS = document.getElementById('settings_domains')
      // const SETTINGS_NOTIFICATIONS = document.getElementById('settings_notifications')
      // const SETTINGS_MECHANISM = document.getElementById('settings_mechanism')
      // const CURRENT_TASK_INPUT = SETTINGS_TASK.querySelector('input[type="text"]')
      // const ADD_DOMAIN_INPUT = SETTINGS_DOMAINS.querySelector('input[type="text"]')

      // TASK_REMINDER.addEventListener('click', nextLayout)
      // document.addEventListener('keydown', onKeyDown)
      //
      // let SETTINGS_DISPLAY = DISP_0

      // function onKeyDown (event) {
      //   const TAB_KEY_CODE = 9
      //   const ESC_KEY_CODE = 27
      //
      //   if (event.keyCode === TAB_KEY_CODE) {
      //     if (SETTINGS_DISPLAY !== DISP_4) {
      //       event.preventDefault()
      //     }
      //     nextLayout()
      //   }
      //
      //   if (event.keyCode === ESC_KEY_CODE) {
      //     displayLayout(DISP_0)
      //   }
      // }

      // function nextLayout () {
      //   switch (SETTINGS_DISPLAY) {
      //     case DISP_0:
      //       displayLayout(DISP_1)
      //       break
      //     case DISP_1:
      //       displayLayout(DISP_2)
      //       break
      //     case DISP_2:
      //       displayLayout(DISP_3)
      //       break
      //     case DISP_3:
      //       displayLayout(DISP_4)
      //       break
      //     case DISP_4:
      //       displayLayout(DISP_0)
      //       break
      //   }
      // }

      // function displayLayout (displaySetting) {
      //   hideAllSettings()
      //   switch (displaySetting) {
      //     case DISP_0:
      //       displayReminderOnly()
      //       break
      //     case DISP_1:
      //       displaySettingsTask()
      //       break
      //     case DISP_2:
      //       displaySettingsDomains()
      //       break
      //     case DISP_3:
      //       displaySettingsMechanism()
      //       break
      //     case DISP_4:
      //       displaySettingsNotifications()
      //       break
      //   }
      // }

      // function hideAllSettings () {
      //   LOGO.style.display = 'none'
      //   QUOTE.style.display = 'none'
      //   SETTINGS_TASK.style.display = 'none'
      //   SETTINGS_DOMAINS.style.display = 'none'
      //   SETTINGS_NOTIFICATIONS.style.display = 'none'
      //   SETTINGS_MECHANISM.style.display = 'none'
      // }

      // function stopSlideShow () {
      //   clearInterval(interval)
      //   LOGO.style.display = 'none'
      //   QUOTE.style.display = 'none'
      // }

      // function displayReminderOnly () {
      //   SETTINGS_DISPLAY = DISP_0
      //   startSlideShow()
      // }
      //
      // function displaySettingsTask () {
      //   stopSlideShow()
      //   SETTINGS_DISPLAY = DISP_1
      //   SETTINGS_TASK.style.display = 'block'
      //   CURRENT_TASK_INPUT.focus()
      // }
      //
      // function displaySettingsDomains () {
      //   SETTINGS_DISPLAY = DISP_2
      //   SETTINGS_DOMAINS.style.display = 'block'
      //   ADD_DOMAIN_INPUT.focus()
      // }
      //
      // function displaySettingsMechanism () {
      //   SETTINGS_DISPLAY = DISP_3
      //   SETTINGS_MECHANISM.style.display = 'block'
      // }
      //
      // function displaySettingsNotifications () {
      //   SETTINGS_DISPLAY = DISP_4
      //   SETTINGS_NOTIFICATIONS.style.display = 'block'
      // }
    }
  }
</script>

<style>
  @import "../../assets/css/main.css";

  #task_reminder {
    user-select: none;
    cursor: pointer;
    padding: 13vh 40px 12vh;
  }

  h2 {
    text-transform: uppercase;
    margin-bottom: 25px;
  }

  @keyframes textgrowth {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.12);
    }
  }
</style>
