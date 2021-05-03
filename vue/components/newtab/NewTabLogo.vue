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

<script lang="ts">
import { defineComponent } from 'vue'
import quotes from '../../assets/quotes'

export default defineComponent({
  data () {
    return {
      displayed: 'quote',
      quote: {
        text: '',
        author: ''
      },
      interval: undefined as number | undefined
    }
  },
  mounted () {
    this.interval = window.setInterval(this.showNextSlide, 16000)
    this.showNextSlide()
  },
  beforeUnmount () {
    window.clearInterval(this.interval)
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
})
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
    @apply text-2xl;
  }

  #logo p {
    @apply text-xs;
  }

  #quote p {
    @apply text-primary-400 text-l;
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
</style>
