<template>
  <header id="warning_panel">
    <h1>This domain has been blocked for a good reason.</h1>
    <h2>Please, pause and reconsider whether you really need to visit this site.</h2>
  </header>
</template>

<style>
@import "../../../assets/css/main.css";

#warning_panel {
  padding: 16vh 0 13vh;
  margin-bottom: 5vh;
  cursor: pointer;
  user-select: none;
  position: relative;
}

#warning_panel h1 {
  margin-bottom: 10px;
}

#warning_panel h2 {
  font-size: var(--font-20);
}
</style>
