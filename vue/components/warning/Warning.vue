<template>
  <div>
    <WarningHeader />
    <WarningChallengeBreathing />
    <WarningChallengeTask />
    <WarningControls />
    <SupportMe />
  </div>
</template>

<script>
import WarningHeader from './WarningHeader.vue'
import WarningChallengeTask from './WarningChallengeTask.vue'
import WarningChallengeBreathing from './WarningChallengeBreathing.vue'
import WarningControls from './WarningControls.vue'
import SupportMe from '../atoms/SupportMe.vue'
import { getChallengeString } from '../../utils/utils.string.js'

export default {
  components: {
    WarningControls,
    WarningChallengeBreathing,
    WarningChallengeTask,
    WarningHeader,
    SupportMe
  },
  computed: {
    backgroundAPI () {
      return this.$store.getters['backgroundAPI/getBackgroundAPI']
    },
    tabId () {
      return this.$store.getters['warning/getTabId']
    },
    targetUrl () {
      return this.$store.getters['warning/getTargetUrl']
    },
  },
  mounted () {
    chrome.runtime.onMessage.addListener(({ id, data }) => {
      if (id === 'BLOCKED_TAB_FEED') {
        this.$store.commit('warning/setTabId', data.tabId)
        this.$store.commit('warning/setTargetUrl', data.targetUrl)

        if (this.backgroundAPI.STORE.getters.getBreathingStatus(this.tabId)) {
          this.backgroundAPI.STORE.mutations.resetBreathing(this.tabId)
        }

        return
      }

      if (id === 'INTERRUPT_BREATHING')
        this.$store.dispatch('warning/interruptBreathing')
      }
    )
  }
}
</script>

<style>
  @import "../../../assets/css/main.css";

  @keyframes fontbulger {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.25);
    }
  }
</style>
