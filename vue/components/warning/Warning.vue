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
  data () {
    return {
      tabId: null,
      targetUrl: null
    }
  },
  computed: {
    backgroundAPI () {
      return this.$store.getters['backgroundAPI/getBackgroundAPI']
    }
  },
  mounted () {
    chrome.runtime.onMessage.addListener(({ id, data }) => {
      if (id === 'BLOCKED_TAB_FEED') {
        this.tabId = data.tabId
        this.targetUrl = data.targetUrl

        if (this.backgroundAPI.STORE.getters.getBreathingStatus(this.tabId)) {
          this.backgroundAPI.STORE.mutations.resetBreathing(this.tabId)
        }

        return
      }

      if (id === 'INTERRUPT_BREATHING') {
        interruptBreathing()
      }
    })

    const visitButton = document.getElementById('visit_button')
    const cancelButton = document.getElementById('cancel_button')
    const proceedButton = document.getElementById('proceed_button')
    const retryBreathing = document.getElementById('try_again')

    const CHALLENGE = document.getElementById('challenge_task')
    const CHALLENGE_STRING = document.getElementById('challenge_string')
    const CHALLENGE_INPUT = document.getElementById('challenge_input')

    let breathingTimeout = null

    const initiateBreathing = () => {
      this.backgroundAPI.STORE.mutations.initiateBreathing(this.tabId)
      this.$store.commit('warning/setBreathing', 'initiated')

      breathingTimeout = setTimeout(() => {
        this.backgroundAPI.STORE.mutations.finishBreathing(this.tabId)
        this.$store.commit('warning/setBreathing', 'success')

        proceedButton.style.display = 'initial'
        cancelButton.style.display = 'initial'
      }, 1000 * this.backgroundAPI.SETTINGS.getters.getBreathCount() * 8)
    }

    const interruptBreathing = () => {
      this.backgroundAPI.STORE.mutations.interruptBreathing(this.tabId)
      this.$store.commit('warning/setBreathing', 'interrupted')
      clearTimeout(breathingTimeout)
    }

    const initiateChallenge = () => {
      CHALLENGE.style.display = 'block'
      CHALLENGE_STRING.innerText = getChallengeString(this.backgroundAPI.SETTINGS.getters.getChallengeDifficulty())
      CHALLENGE_INPUT.focus()
    }

    visitButton.addEventListener('click', () => {
      visitButton.style.display = 'none'
      cancelButton.style.display = 'none'

      switch (this.backgroundAPI.SETTINGS.getters.getActiveMechanism()) {
        case 'breathing':
          return initiateBreathing()
        case 'challenge':
          return initiateChallenge()
      }
    })

    retryBreathing.addEventListener('click', initiateBreathing)
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
