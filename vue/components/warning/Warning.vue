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

<script lang="ts">
import { defineComponent } from 'vue'
import WarningHeader from './WarningHeader.vue'
import WarningChallengeTask from './WarningChallengeTask.vue'
import WarningChallengeBreathing from './WarningChallengeBreathing.vue'
import WarningControls from './WarningControls.vue'
import SupportMe from '../atoms/SupportMe.vue'
import { Message } from '../../../interface/messages.interface'

export default defineComponent({
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
        challenge: null as string | null,
        breathing: null as string | null
      }
    }
  },
  created () {
    chrome.runtime.onMessage.addListener(({ id, data }) => {
      if (id === Message.BlockedTabTargetUrl) {
        this.state.targetUrl = data.targetUrl
      }
    })

    chrome.runtime.onMessage.addListener(({ id }) => {
      if (id === Message.BlockedTabBreathingInterrupted) {
        this.state.breathing = 'interrupted'
      }
    })
  },
  methods: {
    onProceed () {
      chrome.runtime.sendMessage({
        id: Message.BlockedTabAction,
        data: { action: Message.BlockedTabProceed, targetUrl: this.state.targetUrl }
      })
    },
    onCancel () {
      chrome.runtime.sendMessage({
        id: Message.BlockedTabAction,
        data: { action: Message.BlockedTabCancel }
      })
    }
  }
})
</script>

<style>
@import "../../css/main.css";
</style>
