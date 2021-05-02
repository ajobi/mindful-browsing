<template>
  <input
    :checked="value"
    type="checkbox"
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
input[type='checkbox'] {
  -webkit-appearance: none;
  position: relative;
  height: 22px;
  width: 45px;
}

input[type='checkbox']:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  @apply bg-primary-100;
  border-radius: 22px;
  cursor: pointer;
}

input[type='checkbox']:after {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 16px;
  height: 16px;
  border-radius: 16px;
  transition: 0.2s;
  background-color: white;
  cursor: pointer;
}

input[type='checkbox']:checked:after {
  left: 26px;
  @apply bg-primary-400;
}
</style>
