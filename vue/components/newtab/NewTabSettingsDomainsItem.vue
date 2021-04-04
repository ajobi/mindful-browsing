<template>
  <li>
    <span>{{ domain.name }}</span>
    <input
      v-if="!domain.removeTimestamp"
      type="button"
      value="remove"
      class="button--secondary"
      @click="onRemove"
    >
    <input
      v-else
      type="button"
      value="cancel"
      class="button--primary"
      @click="onCancelRemove"
    >
    <span
      v-if="domain.removeTimestamp"
      class="removal-countdown"
    >{{ removalCountdownText }}</span>
  </li>
</template>

<script>
import { format } from '../../../worker/utils/time.js'

export default {
  props: {
    domain: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      removeInterval: null,
      removalCountdownText: ''
    }
  },
  computed: {
    backgroundAPI () {
      return this.$store.getters['backgroundAPI/getBackgroundAPI']
    }
  },
  watch: {
    domain: {
      immediate: true,
      deep: true,
      handler (newValue) {
        clearInterval(this.removeInterval)

        if (newValue.removeTimestamp) {
          const currentTime = new Date().valueOf()
          const timeDifferenceInSeconds = (this.domain.removeTimestamp - currentTime) / 1000
          this.removalCountdownText = `in ${format(timeDifferenceInSeconds)}`

          this.removeInterval = setInterval(() => {
            const currentTime = new Date().valueOf()
            const timeDifferenceInSeconds = (this.domain.removeTimestamp - currentTime) / 1000

            if (timeDifferenceInSeconds > 1) {
              this.removalCountdownText = `in ${format(timeDifferenceInSeconds)}`
            } else {
              this.$store.dispatch('backgroundAPI/deleteBlockedDomain', this.domain.name)
            }
          }, 1000)
        }
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.removeInterval)
  },
  methods: {
    onRemove () {
      this.$store.dispatch('backgroundAPI/removeBlockedDomain', this.domain.name)
    },
    onCancelRemove () {
      this.$store.dispatch('backgroundAPI/cancelRemoval', this.domain.name)
    }
  }
}
</script>

<style>
  .domains-list li {
    margin-top: 10px;
    text-align: right;
    position: relative;
    font-size: var(--font-18);
    margin-right: 80px;
  }

  .domains-list p {
    font-size: var(--font-16);
  }

  input[type="button"] {
    margin-left: 24px;
    width: 160px;
  }

  .domains-list span.removal-countdown {
    position: absolute;
    left: 100%;
    margin-left: 15px;
    line-height: 35px;
    text-align: left;
    min-width: 500px;
  }
</style>
