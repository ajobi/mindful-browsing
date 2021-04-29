<template>
  <div>
    <button
      v-show="modelValue.breathing === null"
      id="visit_button"
      class="button--secondary"
      @click="onVisit"
    >
      I need to visit this site
    </button>
    <button
      v-show="modelValue.breathing === 'success'"
      id="proceed_button"
      class="button--secondary"
      @click="$emit('proceed')"
    >
      I really have to visit this site
    </button>
    <button
      v-show="modelValue.breathing === null || modelValue.breathing === 'success'"
      id="cancel_button"
      class="button--primary"
      @click="$emit('cancel')"
    >
      I have changed my mind
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
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
