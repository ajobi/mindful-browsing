<template>
  <div>
    <ButtonSecondary
      v-show="modelValue.breathing === null"
      id="visit_button"
      @click="onVisit"
    >
      I need to visit this site
    </ButtonSecondary>
    <ButtonSecondary
      v-show="modelValue.breathing === 'success'"
      id="proceed_button"
      @click="$emit('proceed')"
    >
      I really have to visit this site
    </ButtonSecondary>
    <ButtonPrimary
      v-show="modelValue.breathing === null || modelValue.breathing === 'success'"
      id="cancel_button"
      @click="$emit('cancel')"
    >
      I have changed my mind
    </ButtonPrimary>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ButtonPrimary from '../atoms/ButtonPrimary.vue'
import ButtonSecondary from '../atoms/ButtonSecondary.vue'

export default defineComponent({
  components: { ButtonSecondary, ButtonPrimary },
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },
  computed: {
    activeMechanism (): string {
      return this.$store.getters['newtab/getActiveMechanism']
    }
  },
  methods: {
    onVisit () {
      switch (this.activeMechanism) {
        case 'breathing':
          return this.$emit('update:modelValue', { ...this.modelValue, breathing: 'initiated' })
        case 'challenge':
          return this.$emit('update:modelValue', { ...this.modelValue, challenge: 'initiated' })
      }
    }
  }
})
</script>

<style>
#proceed_button {
  /*display: none;*/
}

#visit_button {
  position: relative;
}

#proceed_button {
  position: relative;
}

button {
  height: 36px;
  width: 310px;
  margin: 0 5px;
}
</style>
