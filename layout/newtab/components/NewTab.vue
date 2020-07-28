<template>
  <div>
    <h1
      v-if="settings.userSettings.activeTask.value"
      id="task_reminder"
      @click="nextView"
    >
      {{ `You have promised ${settings.userSettings.activeTask.value}` }}
    </h1>
    <NewTabLogo v-if="activeView === 0" />
    <NewTabSettingsTask
      v-if="activeView === 1"
      :background-a-p-i="backgroundAPI"
    />
    <NewTabSettingsDomains
      v-if="activeView === 2"
      :background-a-p-i="backgroundAPI"
    />
    <NewTabSettingsMechanism
      v-if="activeView === 3"
      :background-a-p-i="backgroundAPI"
    />
    <NewTabSettingsNotifications
      v-if="activeView === 4"
      :background-a-p-i="backgroundAPI"
    />

    <p id="support_us">
      <a
        href="https://www.paypal.me/andrejbilec/5"
        target="_blank"
        tabindex="-1"
      > BUY ME A COFFEE </a>
    </p>
    <span
      id="focus_anchor"
      tabindex="1"
    />
  </div>
</template>

<script>
import NewTabLogo from './NewTabLogo.vue'
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
      settings: null,
      backgroundAPI: null,
      activeView: 0
    }
  },
  mounted () {
    const loadSettings = () => {
      this.settings = this.backgroundAPI.SETTINGS.getters.getSettings()
    }

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

    document.addEventListener('keydown', (event) => {
      const TAB_KEY_CODE = 9
      const ESC_KEY_CODE = 27

      if (event.keyCode === TAB_KEY_CODE) {
        if (this.activeView !== 4) {
          event.preventDefault()
        }
        this.nextView()
      }

      if (event.keyCode === ESC_KEY_CODE) {
        this.activeView = 0
      }
    })
  },
  methods: {
    nextView () {
      this.activeView < 4 ? this.activeView++ : this.activeView = 0
    }
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
