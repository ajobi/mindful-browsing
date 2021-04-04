<template>
  <div v-show="breathing && breathing !== 'success'">
    <h3
      v-show="breathing === 'interrupted'"
      id="try_again"
      @click="onRetry"
    >
      You did not focus, let's try once again?
    </h3>
    <h2
      v-show="breathing === 'initiated'"
      id="breath_guide"
    >
      Take a deep breath
    </h2>
  </div>
</template>

<script>
export default {
  computed: {
    breathing () {
      return this.$store.getters['warning/getBreathing']
    }
  },
  methods: {
    onRetry () {
      this.$store.dispatch('warning/initiateBreathing')
    }
  }
}
</script>

<style>
@import "../../../assets/css/main.css";

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
  font-size: var(--font-32);
  animation: fontbulger 8s infinite;
}
</style>
