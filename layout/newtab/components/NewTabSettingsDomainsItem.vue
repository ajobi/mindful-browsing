<template>
  <li>
    <span>{{ domain.name }}</span>
    <input
      v-if="!domain.removeTimestamp"
      type="button"
      value="remove"
      class="button--secondary"
      @click="onRemove(domain.name)"
    >
    <input
      v-else
      type="button"
      value="cancel"
      class="button--primary"
      @click="onCancelRemove(domain.name)"
    >
    <span
      v-if="domain.removeTimestamp"
      class="removal-countdown"
    >{{ removalCountdown }}</span>
  </li>
</template>

<script>

let removeInterval = null

export default {
  props: {
    domain: {
      type: Object,
      required: true
    },
    backgroundAPI: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      removalCountdown: ''
    }
  },
  mounted () {
    if (this.domain.removeTimestamp) {
      const currentTime = new Date().valueOf()
      const timeDifferenceInSeconds = (this.domain.removeTimestamp - currentTime) / 1000
      this.removalCountdown = `in ${this.backgroundAPI.TIME.format(timeDifferenceInSeconds)}`

      removeInterval = setInterval(() => {
        const currentTime = new Date().valueOf()
        const timeDifferenceInSeconds = (this.domain.removeTimestamp - currentTime) / 1000

        if (timeDifferenceInSeconds > 1) {
          this.removalCountdown = `in ${this.backgroundAPI.TIME.format(timeDifferenceInSeconds)}`
        } else {
          this.backgroundAPI.SETTINGS.mutations.deleteBlockedDomain(this.domain.name)
        }
      }, 1000)
    }
  },
  methods: {
    onRemove (domain) {
      this.backgroundAPI.SETTINGS.mutations.removeBlockedDomain(domain)
    },
    onCancelRemove (domain) {
      this.backgroundAPI.SETTINGS.mutations.cancelRemoval(domain)
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
