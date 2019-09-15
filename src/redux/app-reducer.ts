import { combineReducers, createStore } from 'redux'
import { CounterReducer, ICounterReducerType } from './counter/counter.reducer'

export interface IAppState {
  counterReducer: ICounterReducerType
}

const reducers = combineReducers<IAppState>({
  counterReducer: CounterReducer,
})

export const store = createStore(reducers)
