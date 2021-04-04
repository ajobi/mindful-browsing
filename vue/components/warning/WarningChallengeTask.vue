<template>
  <div
    v-show="challenge && challenge !== 'success'"
    id="challenge_task"
  >
    <h2>Type in the following text:</h2>
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

<script>
import { getChallengeString } from '../../utils/utils.string'

export default {
  computed: {
    backgroundAPI () {
      return this.$store.getters['backgroundAPI/getBackgroundAPI']
    },
    challenge () {
      return this.$store.getters['warning/getChallenge']
    }
  },
  watch: {
    challenge (newValue) {
      const CHALLENGE_STRING = document.getElementById('challenge_string')
      const CORRECT_INPUT = document.getElementById('correct_input')
      const CHALLENGE_INPUT = document.getElementById('challenge_input')

      if (newValue === 'initiated') {
        CHALLENGE_STRING.innerText = getChallengeString(this.backgroundAPI.SETTINGS.getters.getChallengeDifficulty())
        CHALLENGE_INPUT.focus()

        CHALLENGE_INPUT.addEventListener('input', event => {
          if (CHALLENGE_STRING.innerText === CHALLENGE_INPUT.value) {
            this.$store.commit('warning/setChallenge', 'success')
          } else {
            const input = event.target.value
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
</script>

<style>
#challenge_task {
  /*display: none;*/
}

#challenge_task h2 {
  margin-bottom: 25px;
}

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
