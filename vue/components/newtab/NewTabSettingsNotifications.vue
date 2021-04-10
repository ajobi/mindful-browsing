<template>
  <div id="settings_notifications">
    <h2> Notifications: </h2>

    <p>If you end up on a distracting website anyways, you will be reminded <strong>every {{ notificationInterval }} seconds</strong>. </p>

    <label @click="onSoundsAllowedClicked">
      notification sounds <input
        type="checkbox"
        :checked="soundsAllowed"
      >
    </label>

    <button
      class="button--primary"
      @click="onEnterIntervalClicked"
    >
      Change Interval
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ActionTypes as NewtabActions } from '../../store/modules/newtab'

export default defineComponent({
  computed: {
    notificationInterval () {
      return this.$store.getters['newtab/getNotificationInterval']
    },
    soundsAllowed () {
      return this.$store.getters['newtab/getSoundsAllowed']
    }
  },
  methods: {
    onSoundsAllowedClicked () {
      this.$store.dispatch(NewtabActions.SET_SOUNDS_ALLOWED, !this.soundsAllowed)
    },
    onEnterIntervalClicked () {
      const interval = prompt('Enter the notification interval:')

      if (interval === null) {
        return
      }

      this.$store.dispatch(NewtabActions.SET_NOTIFICATION_INTERVAL, interval)
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
