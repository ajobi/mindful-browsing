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
