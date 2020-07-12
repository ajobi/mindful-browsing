<template>
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
</template>

<script>
  import quotes from '../../assets/quotes.js'

  export default {
    mounted() {
      const EMERGE_ANIMATION = '8s linear infinite alternate emerge'
      const LOGO = document.getElementById('logo')
      const QUOTE = document.getElementById('quote')

      function loadQuote () {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
        QUOTE.querySelector('p').innerText = randomQuote.text
        QUOTE.querySelector('span').innerText = randomQuote.author
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
  };
</script>

<style>
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
