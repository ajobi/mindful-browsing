<template>
  <div id="challenge_task">
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
export default {
  mounted () {
    const CHALLENGE = document.getElementById('challenge_task')
    const CHALLENGE_STRING = document.getElementById('challenge_string')
    const CORRECT_INPUT = document.getElementById('correct_input')
    const CHALLENGE_INPUT = document.getElementById('challenge_input')

    const cancelButton = document.getElementById('cancel_button')
    const proceedButton = document.getElementById('proceed_button')

    CHALLENGE_INPUT.addEventListener('input', event => {
      if (CHALLENGE_STRING.innerText === CHALLENGE_INPUT.value) {
        proceedButton.style.display = 'initial'
        cancelButton.style.display = 'initial'
        CHALLENGE.style.display = 'none'
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
</script>

<style>
@import "../../../assets/css/main.css";

#challenge_task {
  display: none;
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
