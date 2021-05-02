<template>
  <input
    :checked="value"
    type="checkbox"
    class="appearance-none relative"
    :style="{ height: '22px', width: '45px' }"
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
  @apply bg-primary-100 absolute inset-0 cursor-pointer;
  content: "";
  border-radius: 22px;
}

input[type='checkbox']:after {
  @apply absolute transition-all duration-200 bg-white cursor-pointer rounded-full;
  content: "";
  top: 3px;
  left: 3px;
  width: 16px;
  height: 16px;
  border-radius: 16px;
}

input[type='checkbox']:checked:after {
  left: 26px;
  @apply bg-primary-400;
}
</style>
