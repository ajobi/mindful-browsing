<template>
  <li>
    <span>{{ domain.name }}</span>
    <ButtonSecondary
      v-if="!domain.removeTimestamp"
      @click="onRemove"
    >
      Remove
    </ButtonSecondary>
    <ButtonPrimary
      v-else
      @click="onCancelRemove"
    >
      Cancel
    </ButtonPrimary>
    <span
      v-if="domain.removeTimestamp"
      class="removal-countdown"
    >{{ removalCountdownText }}</span>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { format } from '../../../worker/utils/time'
import { ActionTypes as NewtabActions, MODULE_NEWTAB } from '../../store/modules/newtab/interface'
import ButtonPrimary from '../atoms/ButtonPrimary.vue'
import ButtonSecondary from '../atoms/ButtonSecondary.vue'

export default defineComponent({
  components: { ButtonSecondary, ButtonPrimary },
  props: {
    domain: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      removeInterval: undefined as number | undefined,
      removalCountdownText: ''
    }
  },
  watch: {
    domain: {
      immediate: true,
      deep: true,
      handler (newValue) {
        window.clearInterval(this.removeInterval)

        if (newValue.removeTimestamp) {
          const currentTime = new Date().valueOf()
          const timeDifferenceInSeconds = (this.domain.removeTimestamp - currentTime) / 1000
          this.removalCountdownText = `in ${format(timeDifferenceInSeconds)}`

          this.removeInterval = window.setInterval(() => {
            const currentTime = new Date().valueOf()
            const timeDifferenceInSeconds = (this.domain.removeTimestamp - currentTime) / 1000

            if (timeDifferenceInSeconds > 1) {
              this.removalCountdownText = `in ${format(timeDifferenceInSeconds)}`
            } else {
              this.$store.dispatch(`${MODULE_NEWTAB}/${NewtabActions.DELETE_BLOCKED_DOMAIN}`, this.domain.name)
            }
          }, 1000)
        }
      }
    }
  },
  beforeUnmount () {
    window.clearInterval(this.removeInterval)
  },
  methods: {
    onRemove () {
      this.$store.dispatch(`${MODULE_NEWTAB}/${NewtabActions.REMOVE_BLOCKED_DOMAIN}`, this.domain.name)
    },
    onCancelRemove () {
      this.$store.dispatch(`${MODULE_NEWTAB}/${NewtabActions.CANCEL_REMOVAL}`, this.domain.name)
    }
  }
})
</script>

<style>
  .domains-list li {
    margin-top: 10px;
    text-align: right;
    position: relative;
    font-size: var(--font-18);
    margin-right: 80px;
  }

  .domains-list p {
    font-size: var(--font-16);
  }

  .domains-list button {
    margin-left: 24px;
    width: 160px;
  }

  .domains-list span.removal-countdown {
    position: absolute;
    left: 100%;
    margin-left: 15px;
    line-height: 35px;
    text-align: left;
    min-width: 500px;
  }
</style>
