<template>
  <div>
    <h1 id="task_reminder" @click="nextView">fsafsaf</h1>
    <NewTabLogo v-if="activeView === 0"/>
    <NewTabSettingsTask v-if="activeView === 1" :backgroundAPI="backgroundAPI" />
    <NewTabSettingsDomains v-if="activeView === 2" :backgroundAPI="backgroundAPI" />
    <NewTabSettingsMechanism v-if="activeView === 3" :backgroundAPI="backgroundAPI" />
    <NewTabSettingsNotifications v-if="activeView === 4" :backgroundAPI="backgroundAPI" />

    <p id="support_us"><a href="https://www.paypal.me/andrejbilec/5" target="_blank" tabindex="-1"> BUY ME A COFFEE </a></p>
    <span id="focus_anchor" tabindex="1"></span>
  </div>
</template>

<script>
  import NewTabLogo from './NewTabLogo.vue';
  import NewTabSettingsTask from './NewTabSettingsTask.vue'
  import NewTabSettingsDomains from './NewTabSettingsDomains.vue'
  import NewTabSettingsMechanism from './NewTabSettingsMechanism.vue'
  import NewTabSettingsNotifications from './NewTabSettingsNotifications.vue'

  export default {
    components: {
      NewTabLogo,
      NewTabSettingsTask,
      NewTabSettingsDomains,
      NewTabSettingsMechanism,
      NewTabSettingsNotifications
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
      const loadSettings = () => {
        console.log('On Settings changed')
      }

      const initiateNewtab = () => {
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
  @import "../../../assets/css/main.css";

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
