export interface BlockedDomain {
  name: string,
  removeTimestamp: string | null
}

export type MindfulnessMechanism = 'breathing' | 'challenge'

export interface Validator {
  readonly minValue: number
  readonly maxValue: number
}

type UserSetting<Type> = {
  value: Type,
  readonly default: Type
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
    readonly [SettingsKey.ActiveTask]: UserSetting<string>,
    readonly [SettingsKey.BlockedDomains]: UserSetting<BlockedDomain[]>,
    readonly [SettingsKey.SoundsAllowed]: UserSetting<boolean>,
    readonly [SettingsKey.NotificationInterval]: UserSetting<number>,
    readonly [SettingsKey.ActiveMechanism]: UserSetting<MindfulnessMechanism>
    readonly [SettingsKey.BreathCount]: UserSetting<number>
    readonly [SettingsKey.ChallengeDifficulty]: UserSetting<number>
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

export type SettingsValue<Key extends SettingsKey> = ExtensionSettings['userSettings'][Key]['value']
