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

<script lang="ts">
import { defineComponent } from 'vue'
import { ActionTypes as NewtabActions } from '../../store/modules/newtab/interface'
import NewTabSettingsDomainsItem from './NewTabSettingsDomainsItem.vue'

export default defineComponent({
  components: {
    NewTabSettingsDomainsItem
  },
  data () {
    return {
      inputText: ''
    }
  },
  computed: {
    blockedDomains () {
      return this.$store.getters['newtab/getBlockedDomains']
    }
  },
  mounted () {
    const input = this.$refs.input as HTMLInputElement
    input.focus()
  },
  methods: {
    onSubmit () {
      this.$store.dispatch(NewtabActions.ADD_BLOCKED_DOMAIN, this.inputText)
      this.inputText = ''
    }
  }
})
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
