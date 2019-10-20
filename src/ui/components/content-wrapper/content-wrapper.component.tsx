import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import maps from './content-wrapper.map'
import './content-wrapper.css'

interface IContentWrapperPropType {
  isRetracted?: boolean
}

interface IContentWrapperStateType { }

export class ContentWrapperComponent extends PureComponent<IContentWrapperPropType, IContentWrapperStateType>{

  getContentWrapperStyle(): string{
    return !this.props.isRetracted ? 'content-wrapper' : 'content-wrapper-retracted'
  }

  render(): JSX.Element {
    return (
      <div className={this.getContentWrapperStyle()}>
        {this.props.children}
      </div>
    )
  }
}

export const ContentWrapper = connect(maps.mapStateToProps, maps.mapDispatchToProps)(ContentWrapperComponent)

