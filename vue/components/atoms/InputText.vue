<template>
  <input
    ref="input"
    :value="value"
    type="text"
    :size="size"
    class="input-text"
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
