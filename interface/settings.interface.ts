type BlockedDomain = {
  name: string,
  removeTimestamp: string | null
}

type MindfulnessMechanism = 'breathing' | 'challenge'

type Validator = {
  readonly minValue: number
  readonly maxValue: number
}

type UserSetting<Type> = {
  value: Type,
  readonly default: Type
}

const SETTINGS_KEY_ACTIVE_TASK = 'activeTask'
const SETTINGS_KEY_BLOCKED_DOMAINS = 'blockedDomains'
const SETTINGS_KEY_SOUNDS_ALLOWED = 'soundsAllowed'
const SETTINGS_KEY_NOTIFICATION_INTERVAL = 'notificationInterval'
const SETTINGS_KEY_ACTIVE_MECHANISM = 'activeMechanism'
const SETTINGS_KEY_BREATH_COUNT = 'breathCount'
const SETTINGS_KEY_CHALLENGE_DIFFICULTY = 'challengeDifficulty'

export type UserSettingsKey =
  typeof SETTINGS_KEY_ACTIVE_TASK |
  typeof SETTINGS_KEY_BLOCKED_DOMAINS |
  typeof SETTINGS_KEY_SOUNDS_ALLOWED |
  typeof SETTINGS_KEY_NOTIFICATION_INTERVAL |
  typeof SETTINGS_KEY_ACTIVE_MECHANISM |
  typeof SETTINGS_KEY_BREATH_COUNT |
  typeof SETTINGS_KEY_CHALLENGE_DIFFICULTY

export type UserSettingsValue = string | boolean | number | undefined | BlockedDomain[] | MindfulnessMechanism

export interface ExtensionSettings {
  readonly userSettings: {
    readonly [SETTINGS_KEY_ACTIVE_TASK]: UserSetting<string>,
    readonly [SETTINGS_KEY_BLOCKED_DOMAINS]: UserSetting<BlockedDomain[]>,
    readonly [SETTINGS_KEY_SOUNDS_ALLOWED]: UserSetting<boolean>,
    readonly [SETTINGS_KEY_NOTIFICATION_INTERVAL]: UserSetting<number>,
    readonly [SETTINGS_KEY_ACTIVE_MECHANISM]: UserSetting<MindfulnessMechanism>
    readonly [SETTINGS_KEY_BREATH_COUNT]: UserSetting<number>
    readonly [SETTINGS_KEY_CHALLENGE_DIFFICULTY]: UserSetting<number>
  },
  readonly extensionSettings: {
    readonly removeDelay: number,
    readonly validators: {
      readonly activeTask: Validator
      readonly notificationInterval: Validator
      readonly breathCount: Validator
      readonly challengeDifficulty: Validator
    }
  }
}
