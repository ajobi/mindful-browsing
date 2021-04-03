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

export default {
  components: {
    WarningControls,
    WarningChallengeBreathing,
    WarningChallengeTask,
    WarningHeader,
    SupportMe
  }
}
</script>
