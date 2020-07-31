<template>
  <form
    id="settings_domains"
    @submit.prevent="onSubmit"
  >
    <h2> Distracting domains: </h2>
    <input
      ref="input"
      v-model="inputText"
      type="text"
      size="40"
      class="input-text"
    >
    <ul
      v-if="blockedDomains.length > 0"
      class="domains-list"
    >
      <NewTabSettingsDomainsItem
        v-for="domain in blockedDomains"
        :key="domain.name"
        :domain="domain"
      />
    </ul>
    <p
      v-else
      class="no-domains"
    >
      No distracting domains yet!
    </p>
  </form>
</template>

<script>
import NewTabSettingsDomainsItem from './NewTabSettingsDomainsItem.vue'

export default {
  components: {
    NewTabSettingsDomainsItem
  },
  data () {
    return {
      inputText: ''
    }
  },
  computed: {
    backgroundAPI () {
      return this.$store.getters['backgroundAPI/getBackgroundAPI']
    },
    blockedDomains () {
      return this.$store.getters['settings/getBlockedDomains']
    }
  },
  mounted () {
    this.$refs.input.focus()
  },
  methods: {
    onSubmit () {
      if (!this.backgroundAPI.VALIDATORS.validators.validateDomainName(this.inputText)) {
        alert(this.backgroundAPI.VALIDATORS.errorMessages.errorDomainName(this.inputText))
        return
      }

      if (!this.backgroundAPI.VALIDATORS.validators.validateNewDomainName(this.inputText)) {
        alert(this.backgroundAPI.VALIDATORS.errorMessages.errorExistingDomain(this.inputText))
        return
      }

      this.backgroundAPI.SETTINGS.mutations.addBlockedDomain(this.backgroundAPI.URL.domainNameFromUrl(this.inputText))
      this.inputText = ''
    }
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

  .no-domains {
    margin-top: 25px;
  }
</style>
