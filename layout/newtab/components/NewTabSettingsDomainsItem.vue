<template>
  <li>
    <span>{{ domain.name }}</span>
    <input v-if="!domain.removeTimestamp" type="button" value="remove" class="button--secondary" @click="onRemove(domain.name)"/>
    <input v-else type="button" value="cancel" class="button--primary" @click="onCancelRemove(domain.name)"/>
    <span class="removal-countdown"></span>
  </li>
</template>

<script>
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
    mounted() {
      // if (blockedDomain.removeTimestamp) {
      //   const currentTime = new Date().valueOf()
      //   const timeDifferenceInSeconds = (blockedDomain.removeTimestamp - currentTime) / 1000
      //   removalCountdown.innerText = `in ${this.backgroundAPI.TIME.format(timeDifferenceInSeconds)}`
      //
      //   removeTimeouts.push(setInterval(() => {
      //     const currentTime = new Date().valueOf()
      //     const timeDifferenceInSeconds = (blockedDomain.removeTimestamp - currentTime) / 1000
      //
      //     if (timeDifferenceInSeconds > 1) {
      //       removalCountdown.innerText = `in ${this.backgroundAPI.TIME.format(timeDifferenceInSeconds)}`
      //     } else {
      //       this.backgroundAPI.SETTINGS.mutations.deleteBlockedDomain(blockedDomain.name)
      //     }
      //   }, 1000))
      // }
    },
    methods: {
      onRemove(domain) {
        this.backgroundAPI.SETTINGS.mutations.removeBlockedDomain(domain)
      },
      onCancelRemove(domain) {
        this.backgroundAPI.SETTINGS.mutations.cancelRemoval(domain)
      }
    }
  };
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
