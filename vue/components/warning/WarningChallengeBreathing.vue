<template>
  <div v-show="modelValue.breathing && modelValue.breathing !== 'success'">
    <h3
      v-show="modelValue.breathing === 'interrupted'"
      id="try_again"
      @click="onRetry"
    >
      You did not focus, let's try once again?
    </h3>
    <h2
      v-show="modelValue.breathing === 'initiated'"
      id="breath_guide"
      class="text-2xl"
    >
      Take a deep breath
    </h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },
  methods: {
    onRetry () {
      this.$emit('update:modelValue', { ...this.modelValue, breathing: 'initiated' })
    }
  }
})
</script>

<style>
@keyframes fontbulger {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.25);
  }
}

#try_again {
  cursor: pointer;
}

#breath_guide {
  line-height: 30px;
  user-select: none;
  @apply text-3xl;
  animation: fontbulger 8s infinite;
}
</style>
