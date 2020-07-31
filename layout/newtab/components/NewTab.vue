<template>
  <div>
    <NewTabTask @click.native="nextView" />
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
import NewTabTask from './NewTabTask.vue'
import NewTabLogo from './NewTabLogo.vue'
import NewTabSettingsTask from './NewTabSettingsTask.vue'
import NewTabSettingsDomains from './NewTabSettingsDomains.vue'
import NewTabSettingsMechanism from './NewTabSettingsMechanism.vue'
import NewTabSettingsNotifications from './NewTabSettingsNotifications.vue'

export default {
  components: {
    NewTabTask,
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
    chrome.runtime.getBackgroundPage(backgroundGlobal => { this.backgroundAPI = backgroundGlobal.backgroundAPI })
    window.addEventListener('keydown', this.onKeyDown)
    this.$once('hook:destroy', () => {
      window.removeEventListener('keydown', this.onKeyDown)
    })
  },
  methods: {
    nextView () {
      this.activeView < 4 ? this.activeView++ : this.startView()
    },
    startView () {
      this.activeView = 0
    },
    onKeyDown (event) {
      const { keyCode } = event

      // on tab pressed
      if (keyCode === 9) {
        event.preventDefault()
        this.nextView()
      }

      // on esc pressed
      if (keyCode === 27) {
        event.preventDefault()
        this.startView()
      }
    }
  }
}
</script>

<style>
  @import "../../../assets/css/main.css";

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
