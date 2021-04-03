<template>
  <div>
    <button
      id="visit_button"
      class="button--secondary"
      v-show="breathing === null"
    >
      I need to visit this site
    </button>
    <button
      id="proceed_button"
      class="button--secondary"
      @click="onProceed"
      v-show="breathing === 'success'"
    >
      I really have to visit this site
    </button>
    <button
      id="cancel_button"
      class="button--primary"
      @click="onCancel"
      v-show="breathing === null || breathing === 'success'"
    >
      I have changed my mind
    </button>
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
