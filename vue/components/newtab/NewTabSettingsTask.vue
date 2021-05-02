<template>
  <form
    id="settings_task"
    @submit.prevent="onSubmit"
  >
    <HeadingSettings>
      Current task:
    </HeadingSettings>
    <InputLabel>
      In the following time frame, you would like <br>
      <InputText
        ref="input"
        v-model="inputText"
      />
    </InputLabel>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ActionTypes as NewtabActions, MODULE_NEWTAB } from '../../store/modules/newtab/interface'
import HeadingSettings from '../atoms/HeadingSettings.vue'
import InputText from '../atoms/InputText.vue'
import InputLabel from '../atoms/InputLabel.vue'

export default defineComponent({
  components: { InputLabel, InputText, HeadingSettings },
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
      this.$store.dispatch(`${MODULE_NEWTAB}/${NewtabActions.SET_ACTIVE_TASK}`, this.inputText)
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
    @apply text-l;
  }
</style>
