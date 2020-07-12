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

    <PageNewtabTask :backgroundAPI="backgroundAPI" />
    <PageNewtabDomains :backgroundAPI="backgroundAPI" />
    <PageNewtabMechanism :backgroundAPI="backgroundAPI" />
    <PageNewtabNotifications :backgroundAPI="backgroundAPI" />

    <p id="support_us"><a href="https://www.paypal.me/andrejbilec/5" target="_blank" tabindex="-1"> BUY ME A COFFEE </a></p>

    <span id="focus_anchor" tabindex="1"></span>
  </div>
</template>

<script>
  import PageNewtabTask from './PageNewtabTask.vue'
  import PageNewtabDomains from './PageNewtabDomains.vue'
  import PageNewtabMechanism from './PageNewtabMechanism.vue'
  import PageNewtabNotifications from './PageNewtabNotifications.vue'
  import quotes from '../../assets/quotes.js'

  export default {
    components: {
      PageNewtabTask,
      PageNewtabDomains,
      PageNewtabMechanism,
      PageNewtabNotifications
    },
    data () {
      return {
        backgroundAPI: null
      }
    },
    mounted() {
      const initiateNewtab = () => {
        loadSettings()
        startSlideShow()

        this.backgroundAPI.SETTINGS.onSettingsChanged.addListener(loadSettings)
        window.addEventListener('unload', () => {
          this.backgroundAPI.SETTINGS.onSettingsChanged.removeListener(loadSettings)
        })
      }

      chrome.runtime.getBackgroundPage(backgroundGlobal => {
        this.backgroundAPI = backgroundGlobal.backgroundAPI

        if (!this.backgroundAPI.SETTINGS.getters.areSettingsLoaded()) {
          this.backgroundAPI.SETTINGS.load().then(() => {
            initiateNewtab()
          })
        } else {
          initiateNewtab()
        }
      })

      function loadSettings () {
        // loadTaskReminder()
        // loadBlockedDomains()
        // loadNotificationSettings()
        // loadMechanismSettings()
      }

      const TASK_REMINDER = document.getElementById('task_reminder')
      const LOGO = document.getElementById('logo')
      const QUOTE = document.getElementById('quote')
      const SETTINGS_TASK = document.getElementById('settings_task')
      const SETTINGS_DOMAINS = document.getElementById('settings_domains')
      const SETTINGS_NOTIFICATIONS = document.getElementById('settings_notifications')
      const SETTINGS_MECHANISM = document.getElementById('settings_mechanism')
      const CURRENT_TASK_INPUT = SETTINGS_TASK.querySelector('input[type="text"]')
      const ADD_DOMAIN_INPUT = SETTINGS_DOMAINS.querySelector('input[type="text"]')

      const EMERGE_ANIMATION = '8s linear infinite alternate emerge'

      TASK_REMINDER.addEventListener('click', nextLayout)
      document.addEventListener('keydown', onKeyDown)

      const DISP_0 = 'DISP_0'
      const DISP_1 = 'DISP_1'
      const DISP_2 = 'DISP_2'
      const DISP_3 = 'DISP_3'
      const DISP_4 = 'DISP_4'

      let SETTINGS_DISPLAY = DISP_0

      function onKeyDown (event) {
        const TAB_KEY_CODE = 9
        const ESC_KEY_CODE = 27

        if (event.keyCode === TAB_KEY_CODE) {
          if (SETTINGS_DISPLAY !== DISP_4) {
            event.preventDefault()
          }
          nextLayout()
        }

        if (event.keyCode === ESC_KEY_CODE) {
          displayLayout(DISP_0)
        }
      }

      function loadQuote () {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
        QUOTE.querySelector('p').innerText = randomQuote.text
        QUOTE.querySelector('span').innerText = randomQuote.author
      }

      function nextLayout () {
        switch (SETTINGS_DISPLAY) {
          case DISP_0:
            displayLayout(DISP_1)
            break
          case DISP_1:
            displayLayout(DISP_2)
            break
          case DISP_2:
            displayLayout(DISP_3)
            break
          case DISP_3:
            displayLayout(DISP_4)
            break
          case DISP_4:
            displayLayout(DISP_0)
            break
        }
      }

      function displayLayout (displaySetting) {
        hideAllSettings()
        switch (displaySetting) {
          case DISP_0:
            displayReminderOnly()
            break
          case DISP_1:
            displaySettingsTask()
            break
          case DISP_2:
            displaySettingsDomains()
            break
          case DISP_3:
            displaySettingsMechanism()
            break
          case DISP_4:
            displaySettingsNotifications()
            break
        }
      }

      function hideAllSettings () {
        LOGO.style.display = 'none'
        QUOTE.style.display = 'none'
        SETTINGS_TASK.style.display = 'none'
        SETTINGS_DOMAINS.style.display = 'none'
        SETTINGS_NOTIFICATIONS.style.display = 'none'
        SETTINGS_MECHANISM.style.display = 'none'
      }

      function showNextQuote () {
        loadQuote()
        LOGO.style.display = 'none'
        QUOTE.style.display = 'block'
        QUOTE.style.animation = EMERGE_ANIMATION
      }

      function showLogo () {
        LOGO.style.display = 'block'
        QUOTE.style.display = 'none'
        LOGO.style.animation = EMERGE_ANIMATION
      }

      let interval

      function startSlideShow () {
        const NUMBER_OF_QUOTES = 1

        let counter = 0

        const showNextSlide = () => {
          if (counter === 0) {
            showLogo()
          } else {
            showNextQuote()
          }

          counter = counter < NUMBER_OF_QUOTES ? counter + 1 : 0
        }

        showNextSlide()
        interval = setInterval(showNextSlide, 16000)
      }

      function stopSlideShow () {
        clearInterval(interval)
        LOGO.style.display = 'none'
        QUOTE.style.display = 'none'
      }

      function displayReminderOnly () {
        SETTINGS_DISPLAY = DISP_0
        startSlideShow()
      }

      function displaySettingsTask () {
        stopSlideShow()
        SETTINGS_DISPLAY = DISP_1
        SETTINGS_TASK.style.display = 'block'
        CURRENT_TASK_INPUT.focus()
      }

      function displaySettingsDomains () {
        SETTINGS_DISPLAY = DISP_2
        SETTINGS_DOMAINS.style.display = 'block'
        ADD_DOMAIN_INPUT.focus()
      }

      function displaySettingsMechanism () {
        SETTINGS_DISPLAY = DISP_3
        SETTINGS_MECHANISM.style.display = 'block'
      }

      function displaySettingsNotifications () {
        SETTINGS_DISPLAY = DISP_4
        SETTINGS_NOTIFICATIONS.style.display = 'block'
      }

    }
  }
</script>

<style>
  @import "../../assets/css/main.css";

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
