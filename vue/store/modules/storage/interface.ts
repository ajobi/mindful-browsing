import { ExtensionSettings } from '../../../../interface/settings.interface'
import { ActionContext } from 'vuex'
import { State } from '../../index'

export type StateStorage = {
  storage: ExtensionSettings | null
}

export enum MutationTypes {
  SET_STORAGE = 'SET_STORAGE'
}

export enum ActionTypes {
  INIT = 'INIT'
}

export interface Mutations<S = StateStorage> {
  [MutationTypes.SET_STORAGE](state: S, payload: ExtensionSettings): void
}

// TODO: get rid of this once proper type support is added
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<StateStorage, State>, 'commit'>;

export interface Actions {
  [ActionTypes.INIT]({ commit }: AugmentedActionContext): void;
}
