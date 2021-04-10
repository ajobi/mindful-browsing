<template>
  <div id="settings_mechanism">
    <h2> Your mindfulness approach: </h2>
    <div class="available-mechanisms">
      <div
        id="mechanism_breathing"
        class="mechanism"
        :class="{'mechanism--active': activeMechanism === 'breathing'}"
        @click="onBreathingSelected"
      >
        <h3>Mindful breathing</h3>
        <p>You will be asked to take <strong> {{ breathCount }} breaths</strong> before you will be allowed to visit distracting content. </p>
        <button
          class="button--primary"
          @click="onBreathCountClicked"
        >
          Customize
        </button>
      </div>
      <div
        id="mechanism_challenge"
        class="mechanism mechanism--recommended"
        :class="{'mechanism--active': activeMechanism === 'challenge'}"
        @click="onChallengeSelected"
      >
        <h3>Small challenge</h3>
        <p>You will be asked to re-type <strong> {{ challengeDifficulty }} characters </strong> of random text before you will be allowed to visit distracting content. </p>
        <button
          class="button--primary"
          @click="onChallengeDifficultyClicked"
        >
          Customize
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ActionTypes as NewtabActions } from '../../store/modules/newtab'

export default defineComponent({
  computed: {
    activeMechanism () {
      return this.$store.getters['newtab/getActiveMechanism']
    },
    breathCount () {
      return this.$store.getters['newtab/getBreathCount']
    },
    challengeDifficulty () {
      return this.$store.getters['newtab/getChallengeDifficulty']
    }
  },
  methods: {
    onBreathingSelected () {
      if (this.activeMechanism !== 'breathing') {
        this.$store.dispatch(NewtabActions.SET_ACTIVE_MECHANISM, 'breathing')
      }
    },
    onChallengeSelected () {
      if (this.activeMechanism !== 'challenge') {
        this.$store.dispatch(NewtabActions.SET_ACTIVE_MECHANISM, 'challenge')
      }
    },
    onBreathCountClicked () {
      const breathCount = prompt('Enter the number of breaths:')

      if (breathCount === null) {
        return
      }

      this.$store.dispatch(NewtabActions.SET_BREATH_COUNT, breathCount)
    },
    onChallengeDifficultyClicked () {
      const challengeDifficulty = prompt('Enter the number of characters:')

      if (challengeDifficulty === null) {
        return
      }

      this.$store.dispatch(NewtabActions.SET_CHALLENGE_DIFFICULTY, challengeDifficulty)
    }
  }
})
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
