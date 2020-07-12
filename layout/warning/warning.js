import Vue from 'vue/dist/vue.runtime.min.js'
import Warning from './components/Warning.vue'

new Vue({
  render: h => h(Warning)
}).$mount('#app')

// chrome.runtime.onMessage.addListener(onMessage)
// document.addEventListener('DOMContentLoaded', onDOMContentLoaded)
//
// let myTabId
// let myTargetUrl
//
// function onMessage ({ id, data }) {
//   if (id === 'BLOCKED_TAB_FEED') {
//     myTabId = data.tabId
//     myTargetUrl = data.targetUrl
//
//     if (backgroundAPI.STORE.getters.getBreathingStatus(myTabId)) {
//       backgroundAPI.STORE.mutations.resetBreathing(myTabId)
//     }
//
//     return
//   }
//
//   if (id === 'INTERRUPT_BREATHING') {
//     interruptBreathing()
//   }
// }
//
// let backgroundAPI
//
// function onDOMContentLoaded () {
//   chrome.runtime.getBackgroundPage(backgroundGlobal => {
//     backgroundAPI = backgroundGlobal.backgroundAPI
//   })
// }
//
// const warningPanel = document.getElementById('warning_panel')
// const visitButton = document.getElementById('visit_button')
// const cancelButton = document.getElementById('cancel_button')
// const proceedButton = document.getElementById('proceed_button')
// const retryBreathing = document.getElementById('try_again')
//
// const BREATH_GUIDE = document.getElementById('breath_guide')
// const CHALLENGE = document.getElementById('challenge_task')
// const CHALLENGE_STRING = document.getElementById('challenge_string')
// const CORRECT_INPUT = document.getElementById('correct_input')
// const CHALLENGE_INPUT = document.getElementById('challenge_input')
//
// visitButton.addEventListener('click', () => {
//   visitButton.style.display = 'none'
//   cancelButton.style.display = 'none'
//
//   switch (backgroundAPI.SETTINGS.getters.getActiveMechanism()) {
//     case 'breathing':
//       return initiateBreathing()
//     case 'challenge':
//       return initiateChallenge()
//   }
// })
//
// let breathingTimeout = null
//
// function initiateBreathing () {
//   backgroundAPI.STORE.mutations.initiateBreathing(myTabId)
//
//   retryBreathing.style.display = 'none'
//   BREATH_GUIDE.style.display = 'inline-flex'
//
//   breathingTimeout = setTimeout(() => {
//     backgroundAPI.STORE.mutations.finishBreathing(myTabId)
//
//     proceedButton.style.display = 'initial'
//     cancelButton.style.display = 'initial'
//     BREATH_GUIDE.style.display = 'none'
//   }, 1000 * backgroundAPI.SETTINGS.getters.getBreathCount() * 8)
// }
//
// function interruptBreathing () {
//   backgroundAPI.STORE.mutations.interruptBreathing(myTabId)
//
//   retryBreathing.style.display = 'block'
//   BREATH_GUIDE.style.display = 'none'
//   clearTimeout(breathingTimeout)
// }
//
// function initiateChallenge () {
//   CHALLENGE.style.display = 'block'
//   CHALLENGE_STRING.innerText = backgroundAPI.STRINGS.getChallengeString(
//     backgroundAPI.SETTINGS.getters.getChallengeDifficulty()
//   )
//   CHALLENGE_INPUT.focus()
// }
//
// CHALLENGE_INPUT.addEventListener('input', event => {
//   if (CHALLENGE_STRING.innerText === CHALLENGE_INPUT.value) {
//     proceedButton.style.display = 'initial'
//     cancelButton.style.display = 'initial'
//     CHALLENGE.style.display = 'none'
//   } else {
//     const input = event.target.value
//     let correctInput = ''
//     for (let i = 0; i < input.length; i++) {
//       if (input[i] === CHALLENGE_STRING.innerText[i]) {
//         correctInput += input[i]
//       } else {
//         break
//       }
//     }
//
//     CORRECT_INPUT.innerText = correctInput
//   }
// })
//
// proceedButton.addEventListener('click', onProceedClicked)
// warningPanel.addEventListener('click', onCancelClicked)
// cancelButton.addEventListener('click', onCancelClicked)
// retryBreathing.addEventListener('click', initiateBreathing)
//
// function onCancelClicked () {
//   chrome.runtime.sendMessage({
//     id: 'BLOCKED_TAB_ACTION',
//     data: { tabId: myTabId, action: 'CANCEL' }
//   })
// }
//
// function onProceedClicked () {
//   chrome.runtime.sendMessage({
//     id: 'BLOCKED_TAB_ACTION',
//     data: { tabId: myTabId, action: 'PROCEED', targetUrl: myTargetUrl }
//   })
// }
