import { ActionContext } from 'vuex'
import { State } from '../../index'

export enum ActionTypes {
  SET_ACTIVE_TASK = 'SET_ACTIVE_TASK',
  ADD_BLOCKED_DOMAIN = 'ADD_BLOCKED_DOMAIN',
  REMOVE_BLOCKED_DOMAIN = 'REMOVE_BLOCKED_DOMAIN',
  CANCEL_REMOVAL = 'CANCEL_REMOVAL',
  DELETE_BLOCKED_DOMAIN = 'DELETE_BLOCKED_DOMAIN',
  SET_ACTIVE_MECHANISM = 'SET_ACTIVE_MECHANISM',
  SET_BREATH_COUNT = 'SET_BREATH_COUNT',
  SET_CHALLENGE_DIFFICULTY = 'SET_CHALLENGE_DIFFICULTY',
  SET_SOUNDS_ALLOWED = 'SET_SOUNDS_ALLOWED',
  SET_NOTIFICATION_INTERVAL = 'SET_NOTIFICATION_INTERVAL',
}

export type Actions = {
  [ActionTypes.SET_ACTIVE_TASK]: (context: ActionContext<void, State>, payload: string) => void,
  [ActionTypes.ADD_BLOCKED_DOMAIN]: (context: ActionContext<void, State>, payload: string) => void,
  [ActionTypes.REMOVE_BLOCKED_DOMAIN]: (context: ActionContext<void, State>, payload: string) => void,
  [ActionTypes.CANCEL_REMOVAL]: (context: ActionContext<void, State>, payload: string) => void,
  [ActionTypes.DELETE_BLOCKED_DOMAIN]: (context: ActionContext<void, State>, payload: string) => void,
  [ActionTypes.SET_ACTIVE_MECHANISM]: (context: ActionContext<void, State>, payload: string) => void,
  [ActionTypes.SET_BREATH_COUNT]: (context: ActionContext<void, State>, payload: number) => void,
  [ActionTypes.SET_CHALLENGE_DIFFICULTY]: (context: ActionContext<void, State>, payload: number) => void,
  [ActionTypes.SET_SOUNDS_ALLOWED]: (context: ActionContext<void, State>, payload: boolean) => void,
  [ActionTypes.SET_NOTIFICATION_INTERVAL]: (context: ActionContext<void, State>, payload: number) => void,
}
