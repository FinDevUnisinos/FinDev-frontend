import { ICounterActionTypes } from './counter.types'
import { COUNTER_ACTIONS } from './counter.constant'

const increment = (): ICounterActionTypes => ({
  type: COUNTER_ACTIONS.INCREMENT,
})

const decrement = (): ICounterActionTypes => ({
  type: COUNTER_ACTIONS.DECREMENT,
})

export const CounterActions = {
  increment,
  decrement,
}
