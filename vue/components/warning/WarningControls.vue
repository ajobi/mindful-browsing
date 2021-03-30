<template>
  <div>
    <button
      id="visit_button"
      class="button--secondary"
    >
      I need to visit this site
    </button>
    <button
      id="proceed_button"
      class="button--secondary"
      @click="onProceed"
    >
      I really have to visit this site
    </button>
    <button
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
