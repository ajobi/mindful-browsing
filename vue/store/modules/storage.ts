import { Message } from '../../../interface/messages.interface'
import { ExtensionSettings } from '../../../interface/settings.interface'
import { ActionContext, ActionTree, Module, MutationTree } from 'vuex'
import { State } from '../index'

export type StateStorage = {
  storage: ExtensionSettings | null
}

const state: StateStorage = {
  storage: null
}

export enum MutationTypes {
  SET_STORAGE = 'SET_STORAGE'
}

export type Mutations<S = StateStorage> = {
  [MutationTypes.SET_STORAGE](state: S, payload: ExtensionSettings): void
}

const mutations: MutationTree<StateStorage> & Mutations = {
  [MutationTypes.SET_STORAGE] (state, payload) {
    state.storage = payload
  }
}

export enum ActionTypes {
  INIT = 'INIT'
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

const actions: ActionTree<StateStorage, State> & Actions = {
  [ActionTypes.INIT] ({ commit }) {
    chrome.runtime.onMessage.addListener(({ id, storage }) => {
      if (id === Message.StorageUpdated) {
        commit(MutationTypes.SET_STORAGE, storage)
      }
    })

    chrome.runtime.sendMessage({ id: Message.StorageUpdateRequest })
  }
}

const module: Module<StateStorage, State> = {
  namespaced: true,
  state,
  actions,
  mutations
}

export default module
