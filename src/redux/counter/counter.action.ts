import { ICounterActionTypes } from './counter.types'
import { COUNTER_ACTIONS } from './counter.constant'

interface ICounterActions {
  increment: () => any,
  decrement: () => any,
}

const increment = (): ICounterActionTypes => ({
  type: COUNTER_ACTIONS.INCREMENT,
})

const decrement = (): ICounterActionTypes => ({
  type: COUNTER_ACTIONS.DECREMENT,
})

export const CounterActions: ICounterActions = {
  increment,
  decrement,
}
