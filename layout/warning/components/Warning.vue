<template>
  <div>
    <WarningHeader />
    <WarningChallengeBreathing />
    <WarningChallengeTask />

    <button
      id="visit_button"
      class="button--secondary"
    >
      I need to visit this site
    </button>

    <button
      id="proceed_button"
      class="button--secondary"
    >
      I really have to visit this site
    </button>
    <button
      id="cancel_button"
      class="button--primary"
    >
      I have changed my mind
    </button>

    <p id="support_us">
      <a
        href="https://www.paypal.me/andrejbilec/5"
        target="_blank"
        tabindex="-1"
      > BUY ME A COFFEE </a>
    </p>
  </div>
</template>

<script>
import WarningHeader from './WarningHeader.vue'
import WarningChallengeTask from './WarningChallengeTask.vue'
import WarningChallengeBreathing from './WarningChallengeBreathing.vue'

export default {
  components: {
    WarningChallengeBreathing,
    WarningChallengeTask,
    WarningHeader
  },
  computed: {
    backgroundAPI () {
      return this.$store.getters['backgroundAPI/getBackgroundAPI']
    }
  },
  mounted () {
    const onMessage = ({ id, data }) => {
      if (id === 'BLOCKED_TAB_FEED') {
        myTabId = data.tabId
        myTargetUrl = data.targetUrl

        if (this.backgroundAPI.STORE.getters.getBreathingStatus(myTabId)) {
          this.backgroundAPI.STORE.mutations.resetBreathing(myTabId)
        }

        return
      }

      if (id === 'INTERRUPT_BREATHING') {
        interruptBreathing()
      }
    }

    chrome.runtime.onMessage.addListener(onMessage)

    let myTabId
    let myTargetUrl

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
      this.backgroundAPI.STORE.mutations.initiateBreathing(myTabId)

      retryBreathing.style.display = 'none'
      BREATH_GUIDE.style.display = 'inline-flex'

      breathingTimeout = setTimeout(() => {
        this.backgroundAPI.STORE.mutations.finishBreathing(myTabId)

        proceedButton.style.display = 'initial'
        cancelButton.style.display = 'initial'
        BREATH_GUIDE.style.display = 'none'
      }, 1000 * this.backgroundAPI.SETTINGS.getters.getBreathCount() * 8)
    }

    const interruptBreathing = () => {
      this.backgroundAPI.STORE.mutations.interruptBreathing(myTabId)

      retryBreathing.style.display = 'block'
      BREATH_GUIDE.style.display = 'none'
      clearTimeout(breathingTimeout)
    }

    const initiateChallenge = () => {
      CHALLENGE.style.display = 'block'
      CHALLENGE_STRING.innerText = this.backgroundAPI.STRINGS.getChallengeString(
        this.backgroundAPI.SETTINGS.getters.getChallengeDifficulty()
      )
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

    proceedButton.addEventListener('click', onProceedClicked)
    warningPanel.addEventListener('click', onCancelClicked)
    cancelButton.addEventListener('click', onCancelClicked)
    retryBreathing.addEventListener('click', initiateBreathing)

    function onCancelClicked () {
      chrome.runtime.sendMessage({
        id: 'BLOCKED_TAB_ACTION',
        data: { tabId: myTabId, action: 'CANCEL' }
      })
    }

    function onProceedClicked () {
      chrome.runtime.sendMessage({
        id: 'BLOCKED_TAB_ACTION',
        data: { tabId: myTabId, action: 'PROCEED', targetUrl: myTargetUrl }
      })
    }
  }
}
</script>

<style>
  @import "../../../assets/css/main.css";

  #proceed_button {
    display: none;
  }

  #visit_button {
    position: relative;
  }

  #proceed_button {
    position: relative;
  }

  button {
    height: 36px;
    width: 310px;
    margin: 0 5px;
  }

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
