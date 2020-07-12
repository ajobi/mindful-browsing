<template>
  <div>
    <h1 id="task_reminder">fsafsaf</h1>

    <div class="central-wrapper">
      <div id="quote_panel">
        <div id="logo">
          <img src="/assets/logo/icon.svg" width="100px">
          <h4>MINDFUL BROWSING</h4>
          <p>Change your browsing habits for good.</p>
        </div>

        <blockquote id="quote">
          <img src="/assets/quote.svg" width="50px">
          <p></p>
          <span></span>
        </blockquote>
      </div>
    </div>

    <div>
      <form id="settings_task">
        <h2> Current task: </h2>
        <label>In the following time frame, you would like <br>
        <input type="text" size="50" class="input-text">
        </label>
      </form>

      <form id="settings_domains">
        <h2> Distracting domains: </h2>
        <input type="text" size="40" class="input-text">
        <ul class="domains-list"></ul>
      </form>

      <div id="settings_mechanism">
        <h2> Your mindfulness approach: </h2>

        <div class="available-mechanisms">
          <div id="mechanism_breathing" class="mechanism">
            <h3>Mindful breathing</h3>
            <p>You will be asked to take <strong> <span></span> breaths</strong> before you will be allowed to visit distracting content. </p>
            <button class="button--primary">Customize</button>
          </div>
          <div id="mechanism_challenge" class="mechanism mechanism--recommended">
            <h3>Small challenge</h3>
            <p>You will be asked to re-type <strong> <span></span> characters </strong> of random text before you will be allowed to visit distracting content. </p>
            <button class="button--primary">Customize</button>
          </div>
        </div>
      </div>

      <div id="settings_notifications">
        <h2> Notifications: </h2>

        <p>If you end up on a distracting website anyways, you will be reminded <strong>every <span></span> seconds</strong>. </p>

        <label>
          notification sounds <input type="checkbox">
        </label>

        <button class="button--primary">Change Interval</button>
      </div>
    </div>

    <p id="support_us"><a href="https://www.paypal.me/andrejbilec/5" target="_blank" tabindex="-1"> BUY ME A COFFEE </a></p>

    <span id="focus_anchor" tabindex="1"></span>
  </div>
</template>

<style>
  #task_reminder {
    user-select: none;
    cursor: pointer;
    padding: 13vh 40px 12vh;
  }

  .central-wrapper {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #logo h4 {
    margin-top: 6px;
    font-size: var(--font-24);
  }

  #logo p {
    font-size: var(--font-14);
  }

  #logo {
    display: none;
  }

  #quote {
    display: none;
  }

  #quote p {
    font-size: var(--font-18);
    color: var(--col-primary-80);
    font-style: italic;
    font-weight: 200;
    max-width: 500px;
    margin-top: 15px;
    margin-bottom: 20px;
    line-height: 180%;
  }

  h2 {
    text-transform: uppercase;
    margin-bottom: 25px;
  }

  @keyframes textgrowth {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.12);
    }
  }

  @keyframes emerge {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 0;
    }
    25% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }
</style>
