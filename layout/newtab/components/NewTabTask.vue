<template>
  <h1
    v-if="activeTask"
    id="task_reminder"
  >
    {{ `You have promised ${activeTask}` }}
  </h1>
</template>

<script>
export default {
  computed: {
    activeTask () {
      return this.$store.getters['settings/getActiveTask']
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
