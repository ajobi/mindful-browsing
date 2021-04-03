<template>
  <div v-show="breathing && breathing !== 'success'">
    <h3 id="try_again" v-show="breathing === 'interrupted'" @click="onRetry">
      You did not focus, let's try once again?
    </h3>
    <h2 id="breath_guide" v-show="breathing === 'initiated'">
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
