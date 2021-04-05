<template>
  <div>
    <WarningHeader v-model="state" />
    <WarningChallengeBreathing v-model="state" />
    <WarningChallengeTask v-model="state" />
    <WarningControls v-model="state" />
    <SupportMe />
  </div>
</template>

<script>
import WarningHeader from './WarningHeader.vue'
import WarningChallengeTask from './WarningChallengeTask.vue'
import WarningChallengeBreathing from './WarningChallengeBreathing.vue'
import WarningControls from './WarningControls.vue'
import SupportMe from '../atoms/SupportMe.vue'
import { MESSAGE_ID_BLOCKED_TAB_TARGET_URL } from '../../../messages'

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
  }
}
</script>
