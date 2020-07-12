<template>
  <div id="settings_mechanism">
    <h2> Your mindfulness approach: </h2>

    <div class="available-mechanisms">
      <div id="mechanism_breathing" class="mechanism">
        <h3>Mindful breathing</h3>
        <p>You will be asked to take <strong> <span></span> breaths</strong> before you will be allowed to visit distracting content. </p>
        <button class="button--primary">Customize</button>
      </div>
      <div id="mechanism_challenge" class="mechanism mechanism--recommended">
        <h3>Small challenge</h3>
        <p>You will be asked to re-type <strong> <span></span> characters </strong> of random text before you will be allowed to visit distracting content. </p>
        <button class="button--primary">Customize</button>
      </div>
    </div>
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
        handler(backgroundAPI) {
          if (backgroundAPI === null) {
            return
          }

          const SETTINGS_MECHANISM = document.getElementById('settings_mechanism')
          const MECHANISM_BREATHING = SETTINGS_MECHANISM.querySelector('#mechanism_breathing')
          const MECHANISM_CHALLENGE = SETTINGS_MECHANISM.querySelector('#mechanism_challenge')

          const activeMechanism = this.backgroundAPI.SETTINGS.getters.getActiveMechanism()

          switch (activeMechanism) {
            case 'breathing':
              setActiveMechanism('mechanism_breathing')
              break
            case 'challenge':
              setActiveMechanism('mechanism_challenge')
              break
          }

          MECHANISM_BREATHING.querySelector(
            'span'
          ).innerText = this.backgroundAPI.SETTINGS.getters.getBreathCount()
          MECHANISM_CHALLENGE.querySelector(
            'span'
          ).innerText = this.backgroundAPI.SETTINGS.getters.getChallengeDifficulty()

          function setActiveMechanism (mechanismId) {
            MECHANISM_BREATHING.classList.remove('mechanism--active')
            MECHANISM_CHALLENGE.classList.remove('mechanism--active')

            if (MECHANISM_BREATHING.id === mechanismId) {
              MECHANISM_BREATHING.classList.add('mechanism--active')
            }

            if (MECHANISM_CHALLENGE.id === mechanismId) {
              MECHANISM_CHALLENGE.classList.add('mechanism--active')
            }
          }
        }
      },
    },
    mounted() {
      const SETTINGS_MECHANISM = document.getElementById('settings_mechanism')
      const MECHANISM_BREATHING = SETTINGS_MECHANISM.querySelector('#mechanism_breathing')
      const MECHANISM_CHALLENGE = SETTINGS_MECHANISM.querySelector('#mechanism_challenge')

      MECHANISM_BREATHING.addEventListener('click', () => {
        if (this.backgroundAPI.SETTINGS.getters.getActiveMechanism() !== 'breathing') {
          this.backgroundAPI.SETTINGS.mutations.setActiveMechanism('breathing')
        }
      })

      MECHANISM_CHALLENGE.addEventListener('click', () => {
        if (this.backgroundAPI.SETTINGS.getters.getActiveMechanism() !== 'challenge') {
          this.backgroundAPI.SETTINGS.mutations.setActiveMechanism('challenge')
        }
      })

      MECHANISM_BREATHING.querySelector('button').addEventListener('click', () => {
        const breathCount = prompt('Enter the number of breaths:')

        if (breathCount === null) {
          return
        }

        if (!this.backgroundAPI.VALIDATORS.validators.validateBreathCount(breathCount)) {
          alert(this.backgroundAPI.VALIDATORS.errorMessages.errorBreathCount(breathCount))
          return
        }

        this.backgroundAPI.SETTINGS.mutations.setBreathCount(breathCount)
      })

      MECHANISM_CHALLENGE.querySelector('button').addEventListener('click', () => {
        const challengeDifficulty = prompt('Enter the number of characters:')

        if (challengeDifficulty === null) {
          return
        }

        if (!this.backgroundAPI.VALIDATORS.validators.validateChallengeDifficulty(challengeDifficulty)) {
          alert(this.backgroundAPI.VALIDATORS.errorMessages.errorChallengeDifficulty(challengeDifficulty))
          return
        }

        this.backgroundAPI.SETTINGS.mutations.setChallengeDifficulty(challengeDifficulty)
      })
    }
  }
</script>

<style>
  #settings_mechanism {
    display: none;
  }

  .available-mechanisms {
    display: flex;
    justify-content: center;
    padding-top: 14px;
  }

  .mechanism {
    position: relative;
    cursor: pointer;
    width: 250px;
    font-size: var(--font-14);
    height: 280px;
    margin: 0 15px;
    user-select: none;
    border-radius: 8px;
    border: 1px solid var(--col-primary-20);
    padding: 40px 25px 30px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .mechanism::after {
    position: absolute;
    content: '';
    top: -12px;
    left: -12px;
    bottom: -12px;
    right: -12px;
    background-color: white;
    opacity: 50%;
    transition: opacity 0.2s;
  }

  .mechanism:hover::after {
    opacity: 15%;
  }

  .mechanism--active::after {
    display: none;
  }

  .mechanism h3 {
    font-weight: 300;
    font-size: var(--font-18);
    margin-bottom: 15px;
  }

  .mechanism button {
    height: 32px;
    border-radius: 32px;
    margin-top: auto;
  }

  .mechanism--recommended::before {
    content: 'recommended';
    font-size: var(--font-12);
    font-weight: 500;
    display: block;
    position: absolute;
    color: var(--col-primary-100);
    background-color: white;
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.1);
    width: 130px;
    height: 30px;
    border-radius: 6px;
    line-height: 30px;
    text-transform: uppercase;
    top: -3px;
    right: -8px;
    transform: rotate(6deg);
  }
</style>
