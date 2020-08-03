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
  data () {
    return {
      inputText: ''
    }
  },
  mounted () {
    this.$refs.input.focus()
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('settings/setActiveTask', this.inputText)
      this.inputText = ''
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
