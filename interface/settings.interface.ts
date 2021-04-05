type Domain = {
  name: string,
  removeTimestamp: string | null
}

type Validator = {
  readonly minValue: number
  readonly maxValue: number
}

type UserSetting<Type> = {
  value: Type,
  readonly default: Type
}

export interface ExtensionSettings {
  readonly userSettings: {
    readonly activeTask: UserSetting<string>,
    readonly blockedDomains: UserSetting<Domain[]>,
    readonly soundsAllowed: UserSetting<boolean>,
    readonly notificationInterval: UserSetting<number>,
    readonly activeMechanism: UserSetting<'breathing' | 'challenge'>
    readonly breathCount: UserSetting<number>
    readonly challengeDifficulty: UserSetting<number>
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
