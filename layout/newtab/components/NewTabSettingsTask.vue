<template>
  <form id="settings_task">
    <h2> Current task: </h2>
    <label>In the following time frame, you would like <br>
      <input type="text" size="50" class="input-text" ref="input">
    </label>
  </form>
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

          const SETTINGS_TASK = document.getElementById('settings_task')
          const CURRENT_TASK_INPUT = SETTINGS_TASK.querySelector('input[type="text"]')
          const TASK_REMINDER = document.getElementById('task_reminder')

          TASK_REMINDER.innerText = `You have promised ${backgroundAPI.SETTINGS.getters.getActiveTask()}`
          TASK_REMINDER.style.display = 'inline-flex'
          CURRENT_TASK_INPUT.value = ''
        }
      }
    },
    mounted() {
      this.$refs.input.focus()

      const SETTINGS_TASK = document.getElementById('settings_task')
      const CURRENT_TASK_INPUT = SETTINGS_TASK.querySelector('input[type="text"]')

      SETTINGS_TASK.addEventListener('submit', event => {
        event.preventDefault()
        const userInput = CURRENT_TASK_INPUT.value

        if (!this.backgroundAPI.VALIDATORS.validators.validateActiveTask(userInput)) {
          alert(this.backgroundAPI.VALIDATORS.errorMessages.errorActiveTask())
          return
        }

        this.backgroundAPI.SETTINGS.mutations.setActiveTask(userInput)
      })
    }
  }
</script>

<style>
  #settings_task input[type='text'] {
    margin-top: 15px;
  }

  #settings_task label {
    font-size: var(--font-18);
  }
</style>
