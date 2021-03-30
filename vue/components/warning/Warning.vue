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

    const warningPanel = document.getElementById('warning_panel')
    const visitButton = document.getElementById('visit_button')
    const cancelButton = document.getElementById('cancel_button')
    const proceedButton = document.getElementById('proceed_button')
    const retryBreathing = document.getElementById('try_again')

    const BREATH_GUIDE = document.getElementById('breath_guide')
    const CHALLENGE = document.getElementById('challenge_task')
    const CHALLENGE_STRING = document.getElementById('challenge_string')
    const CORRECT_INPUT = document.getElementById('correct_input')
    const CHALLENGE_INPUT = document.getElementById('challenge_input')

    let breathingTimeout = null

    const initiateBreathing = () => {
      this.backgroundAPI.STORE.mutations.initiateBreathing(this.tabId)

      retryBreathing.style.display = 'none'
      BREATH_GUIDE.style.display = 'inline-flex'

      breathingTimeout = setTimeout(() => {
        this.backgroundAPI.STORE.mutations.finishBreathing(this.tabId)

        proceedButton.style.display = 'initial'
        cancelButton.style.display = 'initial'
        BREATH_GUIDE.style.display = 'none'
      }, 1000 * this.backgroundAPI.SETTINGS.getters.getBreathCount() * 8)
    }

    const interruptBreathing = () => {
      this.backgroundAPI.STORE.mutations.interruptBreathing(this.tabId)

      retryBreathing.style.display = 'block'
      BREATH_GUIDE.style.display = 'none'
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

    CHALLENGE_INPUT.addEventListener('input', event => {
      if (CHALLENGE_STRING.innerText === CHALLENGE_INPUT.value) {
        proceedButton.style.display = 'initial'
        cancelButton.style.display = 'initial'
        CHALLENGE.style.display = 'none'
      } else {
        const input = event.target.value
        let correctInput = ''
        for (let i = 0; i < input.length; i++) {
          if (input[i] === CHALLENGE_STRING.innerText[i]) {
            correctInput += input[i]
          } else {
            break
          }
        }

        CORRECT_INPUT.innerText = correctInput
      }
    })

    const onCancelClicked = () => {
      chrome.runtime.sendMessage({
        id: 'BLOCKED_TAB_ACTION',
        data: { tabId: this.tabId, action: 'CANCEL' }
      })
    }

    warningPanel.addEventListener('click', onCancelClicked)
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
