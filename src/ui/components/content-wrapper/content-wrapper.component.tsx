import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import maps from './content-wrapper.map'
import './content-wrapper.css'
import { LateralAccessMenu, IMenuItemType, TopMenu } from 'components/index'
import { UserTypes } from 'constants/userType.constants'

interface IContentWrapperPropType {
  isRetracted?: boolean
}

interface IContentWrapperStateType { }

export class ContentWrapperComponent extends PureComponent<IContentWrapperPropType, IContentWrapperStateType>{

  getContentWrapperStyle(): string{
    return !this.props.isRetracted ? 'content-wrapper' : 'content-wrapper-retracted'
  }

  getMenuLateralContent(): IMenuItemType[] {
    if (localStorage.userType == UserTypes.COMPANY) {
      return [
        {
          text: 'FreeLancers',
          path: '/home',
          isMain: true,
        },
        {
          text: 'Projects',
          path: '/company-projects',
          isMain: false,
        },
        {
          text: 'Messages',
          path: '/',
          isMain: false,
        },
        {
          text: 'Accepted',
          path: '/',
          isMain: false,
        }
      ]
    }
    else if (localStorage.userType == UserTypes.EMPLOYEE) {
      return [
        {
          text: 'Projects',
          path: '/freelancer-projects',
          isMain: true,
        },
        {
          text: 'Liked',
          path: '/',
          isMain: false,
        },
        {
          text: 'My Skills',
          path: '/mySkills',
          isMain: false,
        },
        {
          text: 'Accepted',
          path: '/',
          isMain: false,
        }
      ]
    }
    else{
      return []
    }
  }

  render(): JSX.Element {
    return (
      <div className={this.getContentWrapperStyle()}>
        <LateralAccessMenu menuItens={this.getMenuLateralContent()} />
        <div className="home-content">
          <TopMenu />
          {this.props.children}
        </div>
      </div>
    )
  }
}

export const ContentWrapper = connect(maps.mapStateToProps, maps.mapDispatchToProps)(ContentWrapperComponent)

