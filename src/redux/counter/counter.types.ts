import { COUNTER_ACTIONS } from './counter.constant'

interface IncrementAction {
  type: typeof COUNTER_ACTIONS.INCREMENT,
}

interface DecrementAction {
  type: typeof COUNTER_ACTIONS.DECREMENT,
}

export type ICounterActionTypes = IncrementAction | DecrementAction
