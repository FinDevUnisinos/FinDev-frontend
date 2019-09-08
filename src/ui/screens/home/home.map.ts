import { CounterActions } from 'app_redux/counter/index'
import { Dispatch } from 'redux'
import { IAppState } from 'app_redux/index'

const mapStateToProps = (store: IAppState) => {

  return {
    number: store.counterReducer.number
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    increment: () => {
      dispatch(CounterActions.increment())
    },
    decrement: () => {
      dispatch(CounterActions.decrement())
    }
  }
}

export default {
  mapDispatchToProps,
  mapStateToProps,
}
