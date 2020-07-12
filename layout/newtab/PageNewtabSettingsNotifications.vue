<template>
  <div id="settings_notifications">
    <h2> Notifications: </h2>

    <p>If you end up on a distracting website anyways, you will be reminded <strong>every <span></span> seconds</strong>. </p>

    <label>
      notification sounds <input type="checkbox">
    </label>

    <button class="button--primary">Change Interval</button>
  </div>
</template>

<script>
  export default {
    props: {
      backgroundAPI: {
        type: Object,
        required: true
      }
    },
    watch: {
      backgroundAPI: {
        immediate: true,
        handler (backgroundAPI) {
          if (backgroundAPI === null) {
            return
          }

          const SETTINGS_NOTIFICATIONS = document.getElementById('settings_notifications')
          const SOUNDS_ALLOWED_CHECKBOX = SETTINGS_NOTIFICATIONS.querySelector('input[type="checkbox"')

          SETTINGS_NOTIFICATIONS.querySelector(
            'span'
          ).innerText = this.backgroundAPI.SETTINGS.getters.getNotificationInterval()
          SOUNDS_ALLOWED_CHECKBOX.checked = this.backgroundAPI.SETTINGS.getters.getSoundsAllowed()
        }
      }
    },
    mounted() {
      const SETTINGS_NOTIFICATIONS = document.getElementById('settings_notifications')

      const SOUNDS_ALLOWED_CHECKBOX = SETTINGS_NOTIFICATIONS.querySelector('input[type="checkbox"')
      const CUSTOMIZE_NOTIFICATIONS = SETTINGS_NOTIFICATIONS.querySelector('button')

      SOUNDS_ALLOWED_CHECKBOX.addEventListener('click', () => {
        this.backgroundAPI.SETTINGS.mutations.setSoundsAllowed(SOUNDS_ALLOWED_CHECKBOX.checked)
      })

      CUSTOMIZE_NOTIFICATIONS.addEventListener('click', () => {
        const interval = prompt('Enter the notification interval:')

        if (interval === null) {
          return
        }

        if (!this.backgroundAPI.VALIDATORS.validators.validateNotificationInterval(interval)) {
          alert(this.backgroundAPI.VALIDATORS.errorMessages.errorNotificationInterval(interval))
          return
        }

        this.backgroundAPI.SETTINGS.mutations.setNotificationInterval(interval)
      })
    }
  }
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
