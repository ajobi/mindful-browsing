<template>
  <span
    class="relative bg-primary-100 absolute inset-0 cursor-pointer rounded-full h-6 mx-2"
    :style="{ width: '45px' }"
  >
    <input
      :checked="modelValue"
      type="checkbox"
      class="appearance-none "
      @input="$emit('update:modelValue', $event.target.value)"
    >
    <span
      class="absolute transition-all duration-200 cursor-pointer rounded-full left-1 top-1 h-4 w-4"
      :style="modelValue ? { left: '25px' } : {}"
      :class="{ 'bg-primary-400': modelValue, 'bg-white': !modelValue }"
    />
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  emits: {
    'update:modelValue': null
  }
})
</script>
