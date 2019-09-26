import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { LogoImage } from 'assets/index'
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

  renderItem(text: string, path: string, isMain: boolean, index: number): JSX.Element {
    let style: string = isMain ?
      "lateral-access-menu-item lateral-access-menu-item-main" :
      "lateral-access-menu-item"

    const firstStyle = index==0 ? " lateral-access-menu-first-item" : ""

    return (
      <div className={style + firstStyle} key={index}>
        <Link to={path}>
          {text}
        </Link>
      </div>
    )
  }

  renderMenuItens(): JSX.Element[] {
    const { menuItens = [] } = this.props

    return menuItens.map((item: MenuItemType, key) => {
      return this.renderItem(item.text, item.path, item.isMain, key)
    })
  }



  renderContent(): JSX.Element {
    return !this.props.isRetracted ? (
      <div className="lateral-access-menu-content">
        <i className="fas fa-times lateral-access-menu-close-icon"
          onClick={this.props.toogle}
        />
        <img src={LogoImage} className="lateral-access-menu-logo" />
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
