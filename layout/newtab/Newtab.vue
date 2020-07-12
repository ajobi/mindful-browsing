<template>
  <div>
    <h1 id="task_reminder"></h1>

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
