import { Dispatch } from 'redux'
import { IAppState } from 'app_redux/index'

const mapStateToProps = (store: IAppState) => {
  return {
    isRetracted: store.lateralAccessMenuReducer.isRetracted
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { }
}

export default {
  mapDispatchToProps,
  mapStateToProps,
}
