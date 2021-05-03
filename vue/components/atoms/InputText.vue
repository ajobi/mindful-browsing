<template>
  <input
    :value="modelValue"
    type="text"
    :size="size"
    class="text-primary-600 font-thin text-xl text-center caret-primary-300 border-0 focus:outline-none"
    @input="$emit('update:modelValue', $event.target.value)"
  >
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 50
    }
  },
  emits: {
    'update:modelValue': null
  }
})
</script>
