import { LateralAccessMenuActions } from 'app_redux/lateral-access-menu/index'
import { Dispatch } from 'redux'
import { IAppState } from 'app_redux/index'

const mapStateToProps = (store: IAppState) => {
  return {
    isRetracted: store.lateralAccessMenuReducer.isRetracted
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    toogle: () => {
      dispatch(LateralAccessMenuActions.toogle())
    },
  }
}

export default {
  mapDispatchToProps,
  mapStateToProps,
}
