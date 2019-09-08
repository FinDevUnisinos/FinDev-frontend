import { ICounterReducerType, ICounterActionTypes } from './counter.types'
import { COUNTER_ACTIONS } from './counter.constant'

const initialState: ICounterReducerType = {
  number: 0
}

export function CounterReducer(state: ICounterReducerType = initialState, action: ICounterActionTypes): ICounterReducerType {
  switch (action.type) {
    case COUNTER_ACTIONS.INCREMENT:
      return {
        number: state.number + 1
      }
    case COUNTER_ACTIONS.DECREMENT:
      return {
        number: state.number - 1
      }
    default:
      return state
  }
}
