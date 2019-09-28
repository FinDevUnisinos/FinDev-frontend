import { combineReducers, createStore } from 'redux'
import { CounterReducer, ICounterReducerType } from './counter/counter.reducer'
import { LateralAccessMenuReducer, ILateralAccessMenuReducerType } from './lateral-access-menu/lateral-access-menu.reducer'

export interface IAppState {
  counterReducer: ICounterReducerType,
  lateralAccessMenuReducer: ILateralAccessMenuReducerType,
}

const reducers = combineReducers<IAppState>({
  counterReducer: CounterReducer,
  lateralAccessMenuReducer: LateralAccessMenuReducer,
})

export const store = createStore(reducers)
