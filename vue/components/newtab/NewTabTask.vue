<template>
  <h1
    v-if="activeTask"
    id="task_reminder"
  >
    {{ `You have promised ${activeTask}` }}
  </h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  computed: {
    activeTask () {
      return this.$store.getters['newtab/getActiveTask']
    }
  }
})
</script>

<style>
#task_reminder {
  user-select: none;
  cursor: pointer;
  padding: 13vh 40px 12vh;
}
</style>
