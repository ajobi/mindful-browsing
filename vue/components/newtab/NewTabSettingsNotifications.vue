<template>
  <div id="settings_notifications">
    <HeadingSettings>
      Notifications:
    </HeadingSettings>
    <p>If you end up on a distracting website anyways, you will be reminded <strong class="font-normal">every {{ notificationInterval }} seconds</strong>. </p>

    <InputLabel @click="onSoundsAllowedClicked">
      notification sounds
      <InputCheckbox v-model="soundsAllowed" />
    </InputLabel>
    <ButtonPrimary @click="onEnterIntervalClicked">
      Change Interval
    </ButtonPrimary>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ActionTypes as NewtabActions, MODULE_NEWTAB } from '../../store/modules/newtab/interface'
import ButtonPrimary from '../atoms/ButtonPrimary.vue'
import HeadingSettings from '../atoms/HeadingSettings.vue'
import InputLabel from '../atoms/InputLabel.vue'
import InputCheckbox from '../atoms/InputCheckbox.vue'

export default defineComponent({
  components: {
    InputCheckbox,
    InputLabel,
    HeadingSettings,
    ButtonPrimary
  },
  computed: {
    notificationInterval (): number {
      return this.$store.getters['newtab/getNotificationInterval']
    },
    soundsAllowed (): boolean {
      return this.$store.getters['newtab/getSoundsAllowed']
    }
  },
  methods: {
    onSoundsAllowedClicked () {
      this.$store.dispatch(`${MODULE_NEWTAB}/${NewtabActions.SET_SOUNDS_ALLOWED}`, !this.soundsAllowed)
    },
    onEnterIntervalClicked () {
      const interval = prompt('Enter the notification interval:')

      if (interval === null) {
        return
      }

      this.$store.dispatch(`${MODULE_NEWTAB}/${NewtabActions.SET_NOTIFICATION_INTERVAL}`, interval)
    }
  }
})
</script>

<style>
  #settings_notifications p {
    margin-bottom: 10px;
  }

  #settings_notifications label {
    font-weight: 300;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }

  #settings_notifications input {
    margin-left: 10px;
  }

  #settings_notifications button {
    margin-top: 35px;
    height: 32px;
    border-radius: 32px;
  }
</style>
