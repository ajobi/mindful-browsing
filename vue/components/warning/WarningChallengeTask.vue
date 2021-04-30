<template>
  <div
    v-show="modelValue.challenge && modelValue.challenge !== 'success'"
    id="challenge_task"
  >
    <h2 class="text-2xl mb-5">
      Type in the following text:
    </h2>
    <div id="challenge_string_wrapper">
      <p id="challenge_string" />
      <p id="correct_input" />
    </div> <br>
    <input
      id="challenge_input"
      class="input-text"
      type="text"
      size="80"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getChallengeString } from '../../utils/string'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },
  computed: {
    challengeDifficulty (): number {
      return this.$store.getters['newtab/getChallengeDifficulty']
    }
  },
  watch: {
    challenge (newValue) {
      const CHALLENGE_STRING = document.getElementById('challenge_string')
      const CORRECT_INPUT = document.getElementById('correct_input')
      const CHALLENGE_INPUT = document.getElementById('challenge_input') as HTMLInputElement

      if (newValue === 'initiated') {
        if (CHALLENGE_INPUT && CHALLENGE_STRING && CORRECT_INPUT) {
          CHALLENGE_STRING.innerText = getChallengeString(this.challengeDifficulty)
          CHALLENGE_INPUT.focus()

          CHALLENGE_INPUT.addEventListener('input', (event: Event) => {
            if (CHALLENGE_STRING.innerText === CHALLENGE_INPUT.value) {
              this.$emit('update:modelValue', { ...this.modelValue, challenge: 'success' })
            } else {
              const target = event?.target as HTMLInputElement
              const input = target?.value
              let correctInput = ''
              for (let i = 0; i < input.length; i++) {
                if (input[i] === CHALLENGE_STRING.innerText[i]) {
                  correctInput += input[i]
                } else {
                  break
                }
              }

              CORRECT_INPUT.innerText = correctInput
            }
          })
        }
      }
    }
  }
})
</script>

<style>
#challenge_string_wrapper {
  position: relative;
  display: inline-block;
}

#challenge_string {
  user-select: none;
  color: var(--col-primary-50);
  margin-bottom: 15px;
  font-size: var(--font-18);
}

#correct_input {
  user-select: none;
  position: absolute;
  left: 0;
  top: 0;
  font-size: var(--font-18);
}

#challenge_input {
  text-align: center;
}
</style>
