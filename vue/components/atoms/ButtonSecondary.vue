<template>
  <button
    class="focus:outline-none uppercase tracking-tight text-base bg-white text-primary-600 border border-primary-300 hover:border-primary-600 rounded-full transition-all duration-200 font-thin"
    :style="{ height: '35px' }"
  >
    <slot />
  </button>
</template>

<script lang="ts">
export default {}
</script>
