export interface BlockedDomain {
  name: string,
  removeTimestamp: string | null
}

export type MindfulnessMechanism = 'breathing' | 'challenge'

export interface Validator {
  readonly minValue: number
  readonly maxValue: number
}

export enum SettingsKey {
  ActiveTask = 'activeTask',
  BlockedDomains = 'blockedDomains',
  SoundsAllowed = 'soundsAllowed',
  NotificationInterval = 'notificationInterval',
  ActiveMechanism = 'activeMechanism',
  BreathCount = 'breathCount',
  ChallengeDifficulty = 'challengeDifficulty'
}

export interface ExtensionSettings {
  readonly userSettings: {
    [SettingsKey.ActiveTask]: string,
    [SettingsKey.BlockedDomains]: BlockedDomain[],
    [SettingsKey.SoundsAllowed]: boolean,
    [SettingsKey.NotificationInterval]: number,
    [SettingsKey.ActiveMechanism]: MindfulnessMechanism
    [SettingsKey.BreathCount]: number
    [SettingsKey.ChallengeDifficulty]: number
  },
  readonly extensionSettings: {
    readonly removeDelay: number,
    readonly validators: {
      readonly [SettingsKey.ActiveTask]: Validator
      readonly [SettingsKey.NotificationInterval]: Validator
      readonly [SettingsKey.BreathCount]: Validator
      readonly [SettingsKey.ChallengeDifficulty]: Validator
    }
  }
}

export type SettingsValue<Key extends SettingsKey> = ExtensionSettings['userSettings'][Key]
