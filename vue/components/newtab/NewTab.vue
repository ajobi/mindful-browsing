<template>
  <div>
    <NewTabTask @click="nextView" />
    <NewTabLogo v-if="activeView === 0" />
    <NewTabSettingsTask v-if="activeView === 1" />
    <NewTabSettingsDomains v-if="activeView === 2" />
    <NewTabSettingsMechanism v-if="activeView === 3" />
    <NewTabSettingsNotifications v-if="activeView === 4" />
    <SupportMe />
    <span tabindex="1" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NewTabTask from './NewTabTask.vue'
import NewTabLogo from './NewTabLogo.vue'
import NewTabSettingsTask from './NewTabSettingsTask.vue'
import NewTabSettingsDomains from './NewTabSettingsDomains.vue'
import NewTabSettingsMechanism from './NewTabSettingsMechanism.vue'
import NewTabSettingsNotifications from './NewTabSettingsNotifications.vue'
import SupportMe from '../atoms/SupportMe.vue'

export default defineComponent({
  components: {
    NewTabTask,
    NewTabLogo,
    NewTabSettingsTask,
    NewTabSettingsDomains,
    NewTabSettingsMechanism,
    NewTabSettingsNotifications,
    SupportMe
  },
  data () {
    return {
      activeView: 0
    }
  },
  mounted () {
    window.addEventListener('keydown', this.onKeyDown)
  },
  unmounted () {
    window.removeEventListener('keydown', this.onKeyDown)
  },
  methods: {
    nextView () {
      this.activeView < 4 ? this.activeView++ : this.startView()
    },
    startView () {
      this.activeView = 0
    },
    onKeyDown (event: KeyboardEvent) {
      const { keyCode } = event

      const keyCodeTab = 9
      const keyCodeEsc = 27

      if (keyCode === keyCodeTab) {
        event.preventDefault()
        this.nextView()
      }

      if (keyCode === keyCodeEsc) {
        event.preventDefault()
        this.startView()
      }
    }
  }
})
</script>
