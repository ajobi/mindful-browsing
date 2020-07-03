const ENFORCING = (function() {
  const enforcingLog = LOGGER.getNamedLogger('ENFORCING', 'green');

  let countdown;

  function _onNotificationClicked(notificationId) {
    chrome.tabs.query({}, tabs => {
      const forbiddenIds = [];

      for (const tab of tabs) {
        for (const blockedDomain of SETTINGS.getters.getBlockedDomains()) {
          if (URL.isOfDomain(tab.url, blockedDomain.name)) {
            forbiddenIds.push(tab.id);
          }
        }
      }

      chrome.notifications.clear(notificationId);
      chrome.tabs.remove(forbiddenIds);
      chrome.tabs.create({ url: 'chrome://newtab/' });
    });
  }

  function startDisciplineEnforcement() {
    enforcingLog.log('Browsing discipline enforcement started.');

    chrome.notifications.onClicked.addListener(_onNotificationClicked);

    let counter = SETTINGS.getters.getNotificationInterval();
    let secondsSpentOnForbidden = 0;

    countdown = setInterval(() => {
      chrome.runtime.sendMessage({id: 'ENFORCEMENT_KEEP_ALIVE'});
      secondsSpentOnForbidden++;
      enforcingLog.log(`Seconds spent on forbidden content: ${secondsSpentOnForbidden}`);

      if (--counter === 0) {
        ENFORCING.redirectToForbiddenTab();
        NOTIFICATIONS.basicNotification(
          'Mindful Browsing',
          `You have already spent ${TIME.format(secondsSpentOnForbidden)} on distracting websites!`,
          true
        );
        counter = SETTINGS.getters.getNotificationInterval();
      }
    }, 1000);
  }

  function stopDisciplineEnforcement() {
    enforcingLog.log('Browsing discipline enforcement stopped.');

    chrome.notifications.onClicked.removeListener(_onNotificationClicked);
    clearInterval(countdown);
  }

  function redirectToForbiddenTab() {
    chrome.tabs.query({ active: true }, tabs => {
      if (!URL.isForbidden(tabs[0].url)) {
        chrome.tabs.query({}, tabs => {
          for (const tab of tabs) {
            for (const blockedDomain of SETTINGS.getters.getBlockedDomains()) {
              if (URL.isOfDomain(tab.url, blockedDomain.name)) {

                chrome.tabs.update(tab.id, { selected: true });
                return;
              }
            }
          }
        });
      }
    });
  }

  function checkTabsOnUpdate(tabId, changeInfo) {
    if (!changeInfo.url) {
      return;
    }

    checkTabsOnRemoved();
  }

  function checkTabsOnRemoved() {
    chrome.tabs.onRemoved.removeListener(checkTabsOnRemoved);
    chrome.tabs.query({}, tabs => {
      for (tab of tabs) {
        if (URL.isForbidden(tab.url)) {
          chrome.tabs.onRemoved.addListener(checkTabsOnRemoved);
          return;
        }
      }

      NOTIFICATIONS.basicNotification('Mindful Browsing', 'Congratulations! All distracting pages closed!', false);
      removeException();
    });
  }

  function interruptBreathingTabs() {
    for (let tab of STORE.getters.getBreathingTabs()) {
      chrome.tabs.sendMessage(tab.tabId, {
        id: 'INTERRUPT_BREATHING',
        data: null
      });
    }
  }

  return {
    startDisciplineEnforcement,
    stopDisciplineEnforcement,
    redirectToForbiddenTab,
    checkTabsOnUpdate,
    checkTabsOnRemoved,
    interruptBreathingTabs
  };
})();
