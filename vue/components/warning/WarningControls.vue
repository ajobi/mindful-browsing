<template>
  <div>
    <button
      v-show="breathing === null"
      id="visit_button"
      class="button--secondary"
      @click="onVisit"
    >
      I need to visit this site
    </button>
    <button
      v-show="breathing === 'success'"
      id="proceed_button"
      class="button--secondary"
      @click="onProceed"
    >
      I really have to visit this site
    </button>
    <button
      v-show="breathing === null || breathing === 'success'"
      id="cancel_button"
      class="button--primary"
      @click="onCancel"
    >
      I have changed my mind
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    backgroundAPI () {
      return this.$store.getters['backgroundAPI/getBackgroundAPI']
    },
    breathing () {
      return this.$store.getters['warning/getBreathing']
    }
  },
  methods: {
    onVisit () {
      switch (this.backgroundAPI.SETTINGS.getters.getActiveMechanism()) {
        case 'breathing':
          return this.$store.dispatch('warning/initiateBreathing')
        case 'challenge':
          return this.$store.dispatch('warning/initiateChallenge')
      }
    },
    onProceed () {
      chrome.runtime.sendMessage({
        id: 'BLOCKED_TAB_ACTION',
        data: { tabId: this.tabId, action: 'PROCEED', targetUrl: this.targetUrl }
      })
    },
    onCancel () {
      chrome.runtime.sendMessage({
        id: 'BLOCKED_TAB_ACTION',
        data: { tabId: this.tabId, action: 'CANCEL' }
      })
    }
  }
}
</script>

<style>
@import "../../../assets/css/main.css";

#proceed_button {
  /*display: none;*/
}

#visit_button {
  position: relative;
}

#proceed_button {
  position: relative;
}

button {
  height: 36px;
  width: 310px;
  margin: 0 5px;
}
</style>
