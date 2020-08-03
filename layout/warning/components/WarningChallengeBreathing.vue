<template>
  <div>
    <h3 id="try_again">
      You did not focus, let's try once again?
    </h3>
    <h2 id="breath_guide">
      Take a deep breath
    </h2>
  </div>
</template>

<script>
export default {
  name: 'WarningChallengeBreathing'
}
</script>

<style>
@import "../../../assets/css/main.css";

#try_again {
  display: none;
  cursor: pointer;
}

#breath_guide {
  display: none;
  line-height: 30px;
  user-select: none;
  font-size: var(--font-32);
  animation: fontbulger 8s infinite;
}
</style>
