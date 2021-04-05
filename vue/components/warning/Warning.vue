<template>
  <div>
    <WarningHeader
      v-model="state"
      @cancel="onCancel"
    />
    <WarningChallengeBreathing v-model="state" />
    <WarningChallengeTask v-model="state" />
    <WarningControls
      v-model="state"
      @cancel="onCancel"
      @proceed="onProceed"
    />
    <SupportMe />
  </div>
</template>

<script>
import WarningHeader from './WarningHeader.vue'
import WarningChallengeTask from './WarningChallengeTask.vue'
import WarningChallengeBreathing from './WarningChallengeBreathing.vue'
import WarningControls from './WarningControls.vue'
import SupportMe from '../atoms/SupportMe.vue'
import {
  MESSAGE_ID_BLOCKED_TAB_ACTION,
  MESSAGE_ID_BLOCKED_TAB_BREATHING_INTERRUPTED,
  MESSAGE_ID_BLOCKED_TAB_TARGET_URL, MESSAGE_VALUE_BLOCKED_TAB_CANCEL, MESSAGE_VALUE_BLOCKED_TAB_PROCEED
} from '../../../messages'

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
      state: {
        targetUrl: null,
        challenge: null,
        breathing: null
      }
    }
  },
  created () {
    chrome.runtime.onMessage.addListener(({ id, data }) => {
      if (id === MESSAGE_ID_BLOCKED_TAB_TARGET_URL) {
        this.state.targetUrl = data.targetUrl
      }
    })

    chrome.runtime.onMessage.addListener(({ id }) => {
      if (id === MESSAGE_ID_BLOCKED_TAB_BREATHING_INTERRUPTED) {
        this.state.breathing = 'interrupted'
      }
    })
  },
  methods: {
    onProceed () {
      chrome.runtime.sendMessage({
        id: MESSAGE_ID_BLOCKED_TAB_ACTION,
        data: { action: MESSAGE_VALUE_BLOCKED_TAB_PROCEED, targetUrl: this.state.targetUrl }
      })
    },
    onCancel () {
      chrome.runtime.sendMessage({
        id: MESSAGE_ID_BLOCKED_TAB_ACTION,
        data: { action: MESSAGE_VALUE_BLOCKED_TAB_CANCEL }
      })
    }
  }
}
</script>
