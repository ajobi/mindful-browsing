<template>
  <p id="support_me">
    <a
      href="https://www.paypal.me/andrejbilec/5"
      target="_blank"
      tabindex="-1"
    > BUY ME A COFFEE </a>
  </p>
</template>

<script lang="ts">
export default {}
</script>

<style>
#support_me {
  position: fixed;
  @apply text-xxs;
  bottom: 15px;
  right: 20px;
  cursor: pointer;
}

#support_me a:-webkit-any-link {
  text-decoration: none;
  color: inherit;
}
</style>
