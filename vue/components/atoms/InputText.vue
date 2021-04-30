<template>
  <input
    ref="input"
    :value="value"
    type="text"
    :size="size"
    class="text-primary-600 font-thin text-xl text-center caret-primary-300 border-0 focus:outline-none"
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
    },
    size: {
      type: Number,
      default: 50
    }
  }
})
</script>
