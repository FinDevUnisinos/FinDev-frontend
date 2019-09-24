import { LATERAL_ACCESS_MENU_CONSTANTS } from './lateral-access-menu.constant'
import { ILateralAccessMenuActionType } from './lateral-access-menu.type'

export interface ILateralAccessMenuReducerType {
  isRetracted: boolean,
}

const initialState: ILateralAccessMenuReducerType = {
  isRetracted: false
}

export function LateralAccessMenuReducer(state: ILateralAccessMenuReducerType = initialState, action: ILateralAccessMenuActionType) {
  switch (action.type) {
    case LATERAL_ACCESS_MENU_CONSTANTS.TOOGLE:
      const { isRetracted } = state
      return {
        isRetracted: !isRetracted
      }
    default:
      return state
  }
}
