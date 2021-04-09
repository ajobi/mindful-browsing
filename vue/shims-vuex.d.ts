import { Store } from 'vuex'
import { ExtensionSettings } from '../interface/settings.interface'

type StateStorage = {
  storage: ExtensionSettings
}

type State = {
  storage: StateStorage,
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
