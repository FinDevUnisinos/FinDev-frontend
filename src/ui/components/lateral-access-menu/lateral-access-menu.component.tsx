import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import maps from './lateral-access-menu.map'

import './lateral-access-menu.css'

export interface MenuItemType {
  text: string,
  path: string,
  isMain: boolean
}

interface LateralAccessMenuProps {
  menuItens?: MenuItemType[],
  isRetracted: boolean,
  toogle: () => any,
}

interface StateType { }

export class LateralAccessMenuComponent extends PureComponent<LateralAccessMenuProps, StateType> {

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



  renderContent(): JSX.Element {
    return !this.props.isRetracted ? (
      <div className="lateral-access-menu-content">
        <i className="fas fa-times lateral-access-menu-close-icon"
          onClick={this.props.toogle}
        />
        <h1>Logo</h1>
        {this.renderMenuItens()}
      </div>
    ) : <div />
  }

  getContainerStyle(): string {
    return this.props.isRetracted ? "lateral-access-menu-container-retracted" : "lateral-access-menu-container"
  }

  render(): JSX.Element {
    return (
      <div className={this.getContainerStyle()}>
        <div className="lateral-access-menu-lateral-bar">
          {this.props.isRetracted && <i className="fas fa-arrow-right" onClick={this.props.toogle} />}
        </div>
        {this.renderContent()}
      </div>
    )
  }
}

export const LateralAccessMenu = connect(
  maps.mapStateToProps,
  maps.mapDispatchToProps,
)(LateralAccessMenuComponent)
