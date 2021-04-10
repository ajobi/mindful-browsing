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

<script lang="ts">
import { defineComponent } from 'vue'
import { ActionTypes as NewtabActions } from '../../store/modules/newtab'

export default defineComponent({
  data () {
    return {
      inputText: ''
    }
  },
  mounted () {
    const input = this.$refs.input as HTMLInputElement
    input.focus()
  },
  methods: {
    onSubmit () {
      this.$store.dispatch(NewtabActions.SET_ACTIVE_TASK, this.inputText)
      this.inputText = ''
    }
  }
})
</script>

<style>
  #settings_task input[type='text'] {
    margin-top: 15px;
  }

  #settings_task label {
    font-size: var(--font-18);
  }
</style>
