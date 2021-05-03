<template>
  <input
    :checked="value"
    type="checkbox"
    class="appearance-none relative h-6"
    :style="{ width: '45px' }"
    @input="$emit('update:modelValue')"
  >
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    value: {
      type: String,
      required: true
    }
  }
})
</script>

<style>
input[type='checkbox']:before {
  @apply bg-primary-100 absolute inset-0 cursor-pointer rounded-full;
  content: "";
}

input[type='checkbox']:after {
  @apply absolute transition-all duration-200 bg-white cursor-pointer rounded-full left-1 top-1 h-4 w-4;
  content: "";
}

input[type='checkbox']:checked:after {
  left: 26px;
  @apply bg-primary-400;
}
</style>
