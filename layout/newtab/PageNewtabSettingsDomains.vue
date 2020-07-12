<template>
  <form id="settings_domains">
    <h2> Distracting domains: </h2>
    <input type="text" size="40" class="input-text">
    <ul class="domains-list"></ul>
  </form>
</template>

<script>
  let removeTimeouts = []

  export default {
    props: {
      backgroundAPI: {
        type: Object,
        required: true
      }
    },
    watch: {
      backgroundAPI: {
        immediate: true,
        handler(backgroundAPI) {
          if (backgroundAPI === null) {
            return
          }

            const SETTINGS_DOMAINS = document.getElementById('settings_domains')

            ADD_DOMAIN_INPUT.value = ''
            const ADD_DOMAIN_INPUT = SETTINGS_DOMAINS.querySelector('input[type="text"]')

            for (const interval of removeTimeouts) {
              clearInterval(interval)
            }
            removeTimeouts = []

            const blocked_domains = this.backgroundAPI.SETTINGS.getters.getBlockedDomains()

            const blockedDomainsList = SETTINGS_DOMAINS.querySelector('ul')
            blockedDomainsList.innerHTML = ''

            if (blocked_domains.length === 0) {
              const noDomains = document.createElement('p')
              noDomains.innerText = 'No distracting domains yet!'
              blockedDomainsList.appendChild(noDomains)
              return
            }

            for (const blockedDomain of blocked_domains) {
              const listItemNew = document.createElement('li')
              const domainName = document.createElement('span')
              const removeButton = document.createElement('input')
              const cancelRemoveButton = document.createElement('input')
              const removalCountdown = document.createElement('span')

              domainName.innerText = blockedDomain.name

              removeButton.name = blockedDomain.name
              removeButton.type = 'button'
              removeButton.value = 'remove'
              removeButton.classList.add('button--secondary')
              removeButton.addEventListener('click', function () {
                this.backgroundAPI.SETTINGS.mutations.removeBlockedDomain(this.name)
              })

              cancelRemoveButton.name = blockedDomain.name
              cancelRemoveButton.type = 'button'
              cancelRemoveButton.value = 'cancel'
              cancelRemoveButton.classList.add('button--primary')
              cancelRemoveButton.addEventListener('click', function () {
                this.backgroundAPI.SETTINGS.mutations.cancelRemoval(this.name)
              })

              if (blockedDomain.removeTimestamp) {
                removeButton.style.display = 'none'
              } else {
                cancelRemoveButton.style.display = 'none'
              }

              removalCountdown.classList.add('removal-countdown')

              if (blockedDomain.removeTimestamp) {
                const currentTime = new Date().valueOf()
                const timeDifferenceInSeconds = (blockedDomain.removeTimestamp - currentTime) / 1000
                removalCountdown.innerText = `in ${this.backgroundAPI.TIME.format(timeDifferenceInSeconds)}`

                removeTimeouts.push(setInterval(() => {
                  const currentTime = new Date().valueOf()
                  const timeDifferenceInSeconds = (blockedDomain.removeTimestamp - currentTime) / 1000

                  if (timeDifferenceInSeconds > 1) {
                    removalCountdown.innerText = `in ${this.backgroundAPI.TIME.format(timeDifferenceInSeconds)}`
                  } else {
                    this.backgroundAPI.SETTINGS.mutations.deleteBlockedDomain(blockedDomain.name)
                  }
                }, 1000))
              }

              listItemNew.appendChild(domainName)
              listItemNew.appendChild(removeButton)
              listItemNew.appendChild(cancelRemoveButton)
              listItemNew.appendChild(removalCountdown)

              blockedDomainsList.appendChild(listItemNew)
            }
        }
      },
    },
    mounted() {
      const SETTINGS_DOMAINS = document.getElementById('settings_domains')
      const ADD_DOMAIN_INPUT = SETTINGS_DOMAINS.querySelector('input[type="text"]')

      const addDomainName = (userInput) => {
        if (!this.backgroundAPI.VALIDATORS.validators.validateDomainName(userInput)) {
          alert(this.backgroundAPI.VALIDATORS.errorMessages.errorDomainName(userInput))
          return
        }

        if (!this.backgroundAPI.VALIDATORS.validators.validateNewDomainName(userInput)) {
          alert(this.backgroundAPI.VALIDATORS.errorMessages.errorExistingDomain(userInput))
          return
        }

        this.backgroundAPI.SETTINGS.mutations.addBlockedDomain(this.backgroundAPI.URL.domainNameFromUrl(userInput))
      }

      SETTINGS_DOMAINS.addEventListener('submit', event => {
        event.preventDefault()
        addDomainName(ADD_DOMAIN_INPUT.value)
      })
    }
  }
</script>

<style>
  .domains-list {
    padding: 0;
    margin: 25px auto 0 auto;
    width: 500px;
    list-style: none;
  }

  .domains-list li {
    margin-top: 10px;
    text-align: right;
    position: relative;
    font-size: var(--font-18);
    margin-right: 80px;
  }

  .domains-list p {
    font-size: var(--font-16);
  }

  input[type="button"] {
    margin-left: 24px;
    width: 160px;
  }

  .domains-list span.removal-countdown {
    position: absolute;
    left: 100%;
    margin-left: 15px;
    line-height: 35px;
    text-align: left;
    min-width: 500px;
  }
</style>
