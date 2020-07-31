<template>
  <div id="settings_mechanism">
    <h2> Your mindfulness approach: </h2>
    <div class="available-mechanisms">
      <div
        id="mechanism_breathing"
        ref="mechanismBreathing"
        class="mechanism"
        :class="{'mechanism--active': activeMechanism === 'breathing'}"
      >
        <h3>Mindful breathing</h3>
        <p>You will be asked to take <strong> {{ breathCount }} breaths</strong> before you will be allowed to visit distracting content. </p>
        <button class="button--primary">
          Customize
        </button>
      </div>
      <div
        id="mechanism_challenge"
        ref="mechanismChallenge"
        class="mechanism mechanism--recommended"
        :class="{'mechanism--active': activeMechanism === 'challenge'}"
      >
        <h3>Small challenge</h3>
        <p>You will be asked to re-type <strong> {{ challengeDifficulty }} characters </strong> of random text before you will be allowed to visit distracting content. </p>
        <button class="button--primary">
          Customize
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    activeMechanism () {
      return this.$store.getters['settings/getActiveMechanism']
    },
    breathCount () {
      return this.$store.getters['settings/getBreathCount']
    },
    challengeDifficulty () {
      return this.$store.getters['settings/getChallengeDifficulty']
    }
  },
  mounted () {
    const MECHANISM_BREATHING = this.$refs.mechanismBreathing
    const MECHANISM_CHALLENGE = this.$refs.mechanismChallenge

    MECHANISM_BREATHING.addEventListener('click', () => {
      if (this.activeMechanism !== 'breathing') {
        this.$store.dispatch('settings/setActiveMechanism', 'breathing')
      }
    })

    MECHANISM_CHALLENGE.addEventListener('click', () => {
      if (this.activeMechanism !== 'challenge') {
        this.$store.dispatch('settings/setActiveMechanism', 'challenge')
      }
    })

    MECHANISM_BREATHING.querySelector('button').addEventListener('click', () => {
      const breathCount = prompt('Enter the number of breaths:')

      if (breathCount === null) {
        return
      }

      this.$store.dispatch('settings/setBreathCount', breathCount)
    })

    MECHANISM_CHALLENGE.querySelector('button').addEventListener('click', () => {
      const challengeDifficulty = prompt('Enter the number of characters:')

      if (challengeDifficulty === null) {
        return
      }

      this.$store.dispatch('settings/setChallengeDifficulty', challengeDifficulty)
    })
  }
}
</script>

<style>
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
