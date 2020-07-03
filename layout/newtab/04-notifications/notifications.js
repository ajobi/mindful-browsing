const SOUNDS_ALLOWED_CHECKBOX = SETTINGS_NOTIFICATIONS.querySelector('input[type="checkbox"');
const CUSTOMIZE_NOTIFICATIONS = SETTINGS_NOTIFICATIONS.querySelector('button');

function loadNotificationSettings() {
	SETTINGS_NOTIFICATIONS.querySelector(
		'span'
	).innerText = backgroundAPI.SETTINGS.getters.getNotificationInterval();
	SOUNDS_ALLOWED_CHECKBOX.checked = backgroundAPI.SETTINGS.getters.getSoundsAllowed();
}

SOUNDS_ALLOWED_CHECKBOX.addEventListener('click', () => {
	backgroundAPI.SETTINGS.mutations.setSoundsAllowed(SOUNDS_ALLOWED_CHECKBOX.checked);
});

CUSTOMIZE_NOTIFICATIONS.addEventListener('click', () => {
	const interval = prompt('Enter the notification interval:');

	if (interval === null) {
		return
	}

	if (!backgroundAPI.VALIDATORS.validators.validateNotificationInterval(interval)) {
		alert(backgroundAPI.VALIDATORS.errorMessages.errorNotificationInterval(interval));
		return;
	}

	backgroundAPI.SETTINGS.mutations.setNotificationInterval(interval);
});
