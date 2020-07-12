<template>
  <div>
    <header id="warning_panel">
      <h1>This domain has been blocked for a good reason.</h1>
      <h2>Please, pause and reconsider whether you really need to visit this site.</h2>
    </header>

    <button
      id="visit_button"
      class="button--secondary"
    >
      I need to visit this site
    </button>

    <h3 id="try_again">
      You did not focus, let's try once again?
    </h3>
    <h2 id="breath_guide">
      Take a deep breath
    </h2>

    <div id="challenge_task">
      <h2>Type in the following text:</h2>
      <div id="challenge_string_wrapper">
        <p id="challenge_string" />
        <p id="correct_input" />
      </div> <br>
      <input
        id="challenge_input"
        class="input-text"
        type="text"
        size="80"
      >
    </div>

    <button
      id="proceed_button"
      class="button--secondary"
    >
      I really have to visit this site
    </button>
    <button
      id="cancel_button"
      class="button--primary"
    >
      I have changed my mind
    </button>

    <p id="support_us">
      <a
        href="https://www.paypal.me/andrejbilec/5"
        target="_blank"
        tabindex="-1"
      > BUY ME A COFFEE </a>
    </p>
  </div>
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

  #challenge_task {
    display: none;
  }

  #challenge_task h2 {
    margin-bottom: 25px;
  }

  #challenge_string_wrapper {
    position: relative;
    display: inline-block;
  }

  #challenge_string {
    user-select: none;
    color: var(--col-primary-50);
    margin-bottom: 15px;
    font-size: var(--font-18);
  }

  #correct_input {
    user-select: none;
    position: absolute;
    left: 0;
    top: 0;
    font-size: var(--font-18);
  }

  #proceed_button {
    display: none;
  }

  #visit_button {
    position: relative;
  }

  #proceed_button {
    position: relative;
  }

  #challenge_input {
    text-align: center;
  }

  button {
    height: 36px;
    width: 310px;
    margin: 0 5px;
  }

  @keyframes fontbulger {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.25);
    }
  }
</style>
