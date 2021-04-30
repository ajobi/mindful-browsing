<template>
  <h1
    v-if="activeTask"
    class="text-3xl select-none cursor-pointer"
    :style="{ padding: '13vh 40px 12vh'}"
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
