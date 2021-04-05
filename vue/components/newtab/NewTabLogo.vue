<template>
  <div class="central-wrapper">
    <div id="quote_panel">
      <div
        v-if="displayed === 'logo'"
        id="logo"
        class="animated"
      >
        <img
          src="/assets/logo/icon.svg"
          width="100"
        >
        <h4>MINDFUL BROWSING</h4>
        <p>Change your browsing habits for good.</p>
      </div>

      <blockquote
        v-if="displayed === 'quote'"
        id="quote"
        class="animated"
      >
        <img
          src="/assets/quote.svg"
          width="50"
        >
        <p>{{ quote.text }}</p>
        <span>{{ quote.author }}</span>
      </blockquote>
    </div>
  </div>
</template>

<script>
import quotes from '../../assets/quotes.ts'

export default {
  data () {
    return {
      displayed: 'quote',
      quote: {
        text: '',
        author: ''
      }
    }
  },
  mounted () {
    this.interval = setInterval(this.showNextSlide, 16000)
    this.showNextSlide()
  },
  beforeUnmount () {
    clearInterval(this.interval)
  },
  methods: {
    showNextSlide () {
      if (this.displayed === 'logo') {
        this.quote = quotes[Math.floor(Math.random() * quotes.length)]
        this.displayed = 'quote'
      } else {
        this.displayed = 'logo'
      }
    }
  }
}
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

  .animated {
    animation: 8s linear infinite alternate emerge;
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
