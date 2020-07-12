<template>
  <form id="settings_domains" @submit.prevent="onSubmit">
    <h2> Distracting domains: </h2>
    <input type="text" size="40" class="input-text" ref="input" v-model="inputText">
    <ul class="domains-list" v-if="blockedDomains.length > 0">
      <NewTabSettingsDomainsItem
        v-for="domain in blockedDomains"
        :domain="domain"
        :backgroundAPI="backgroundAPI"
        :key="domain.name"
      />
    </ul>
    <p v-else>
      No distracting domains yet!
    </p>
  </form>
</template>

<script>
  import NewTabSettingsDomainsItem from './NewTabSettingsDomainsItem.vue';

  let removeTimeouts = []

  export default {
    components: {
      NewTabSettingsDomainsItem
    },
    props: {
      backgroundAPI: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        inputText: '',
        blockedDomains: []
      }
    },
    watch: {
      backgroundAPI: {
        immediate: true,
        handler(backgroundAPI) {
          if (backgroundAPI === null) {
            return
          }

          for (const interval of removeTimeouts) {
            clearInterval(interval)
          }

          removeTimeouts = []

          this.inputText = ''
          this.blockedDomains = this.backgroundAPI.SETTINGS.getters.getBlockedDomains()
        }
      },
    },
    mounted() {
      this.$refs.input.focus()
    },
    methods: {
      onSubmit() {
        if (!this.backgroundAPI.VALIDATORS.validators.validateDomainName(this.inputText)) {
          alert(this.backgroundAPI.VALIDATORS.errorMessages.errorDomainName(this.inputText))
          return
        }

        if (!this.backgroundAPI.VALIDATORS.validators.validateNewDomainName(this.inputText)) {
          alert(this.backgroundAPI.VALIDATORS.errorMessages.errorExistingDomain(this.inputText))
          return
        }

        this.backgroundAPI.SETTINGS.mutations.addBlockedDomain(this.backgroundAPI.URL.domainNameFromUrl(this.inputText))
      },
    }
  }
</script>

<style>
  .domains-list {
    padding: 0;
    margin: 25px auto 0 auto;
    width: 500px;
    list-style: none;
  }
</style>
