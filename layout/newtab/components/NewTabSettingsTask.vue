<template>
  <form
    id="settings_task"
    @submit.prevent="onSubmit"
  >
    <h2> Current task: </h2>
    <label>In the following time frame, you would like <br>
      <input
        ref="input"
        v-model="inputText"
        type="text"
        size="50"
        class="input-text"
      >
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
  data () {
    return {
      inputText: ''
    }
  },
  watch: {
    backgroundAPI: {
      immediate: true,
      handler (backgroundAPI) {
        if (backgroundAPI === null) {
          return
        }

        this.inputText = ''
      }
    }
  },
  mounted () {
    this.$refs.input.focus()
  },
  methods: {
    onSubmit () {
      if (!this.backgroundAPI.VALIDATORS.validators.validateActiveTask(this.inputText)) {
        alert(this.backgroundAPI.VALIDATORS.errorMessages.errorActiveTask())
        return
      }

      this.backgroundAPI.SETTINGS.mutations.setActiveTask(this.inputText)
    }
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
