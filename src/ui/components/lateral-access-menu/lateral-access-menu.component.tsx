import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import './lateral-access-menu.css'

export interface MenuItemType {
  text: string,
  path: string,
  isMain: boolean
}

interface LateralAccessMenuProps {
  menuItens?: MenuItemType[],
}

interface StateType { }

export class LateralAccessMenu extends PureComponent<LateralAccessMenuProps, StateType> {

  renderItem(text: string, path: string, isMain: boolean): JSX.Element {
    const style: string = isMain ?
      "lateral-access-menu-item lateral-access-menu-item-main" :
      "lateral-access-menu-item"

    return (
      <div className={style}>
        <Link to={path}>
          {text}
        </Link>
      </div>
    )
  }

  renderMenuItens(): JSX.Element[] {
    const { menuItens = [] } = this.props

    return menuItens.map((item: MenuItemType) => {
      return this.renderItem(item.text, item.path, item.isMain)
    })
  }

  render(): JSX.Element {
    return (
      <div className="lateral-access-menu-container">
        <div className="lateral-access-menu-lateral-bar" />
        <div className="lateral-access-menu-content">
          <h1>Logo</h1>
          {this.renderMenuItens()}
        </div>
      </div>
    )
  }
}
