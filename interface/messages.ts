export enum Message {
  StorageUpdated = 'STORAGE_UPDATED',
  StorageUpdateRequest = 'STORAGE_UPDATE_REQUEST',
  BlockedTabAction = 'BLOCKED_TAB_ACTION',
  SetActiveTask = 'SET_ACTIVE_TASK',
  SetBlockedDomains = 'SET_BLOCKED_DOMAINS',
  SetActiveMechanism = 'SET_ACTIVE_MECHANISM',
  SetBreathCount = 'SET_BREATH_COUNT',
  SetChallengeDifficulty = 'SET_CHALLENGE_DIFFICULTY',
  SetSoundsAllowed = 'SET_SOUNDS_ALLOWED',
  SetNotificationInterval = 'SET_NOTIFICATION_INTERVAL',
  BlockedTabTargetUrl = 'BLOCKED_TAB_TARGET_URL',
  BlockedTabBreathingInterrupted = 'BLOCKED_TAB_BREATHING_INTERRUPTED',
  BlockedTabProceed = 'BLOCKED_PROCEED',
  BlockedTabCancel = 'BLOCKED_CANCEL'
}
