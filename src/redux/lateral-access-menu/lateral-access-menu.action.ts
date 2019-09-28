import { ILateralAccessMenuActionType } from './lateral-access-menu.type'
import { LATERAL_ACCESS_MENU_CONSTANTS } from './lateral-access-menu.constant'

interface ILateralAccessMenuActions {
  toogle: () => any,
}

const toogle = (): ILateralAccessMenuActionType => ({
  type: LATERAL_ACCESS_MENU_CONSTANTS.TOOGLE
})

export const LateralAccessMenuActions: ILateralAccessMenuActions = {
  toogle,
}
