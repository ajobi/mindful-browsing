<template>
  <h1
    v-if="settings.userSettings.activeTask.value"
    id="task_reminder"
  >
    {{ `You have promised ${settings.userSettings.activeTask.value}` }}
  </h1>
</template>

<script>
export default {
  props: {
    settings: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
#task_reminder {
  user-select: none;
  cursor: pointer;
  padding: 13vh 40px 12vh;
}
</style>
