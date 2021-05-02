<template>
  <button
    class="focus:outline-none px-10 uppercase tracking-tight text-base border-none text-white bg-primary-400 hover:bg-primary-500 transition-all duration-200 rounded-full"
    :style="{ height: '35px' }"
  >
    <slot />
  </button>
</template>

<script lang="ts">
export default {}
</script>
