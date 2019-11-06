import React, { PureComponent } from 'react'
import maps from './home.map'
import { connect } from 'react-redux'
import { LateralAccessMenu, IMenuItemType, ContentWrapper, TopMenu } from 'components/index'
import { ProjectItemsFreelancer } from './components/project-items-freelancer/project-items-freelancer.component'
import { ProjectItemsCompany } from './components/project-items-company/project-items-company.component'
import './home.css'
import { UserTypes } from 'constants/userType.constants'

interface HomeProps {
  number: number,
  increment: () => any,
  decrement: () => any,
}

interface StateType { }

export class HomeScreen extends PureComponent<HomeProps, StateType> {

  constructor(props: HomeProps) {
    super(props)
  }

  render(): JSX.Element {
    if (localStorage.userType == UserTypes.COMPANY) {
      return (
        <ProjectItemsCompany />
      )
    } else if (localStorage.userType == UserTypes.EMPLOYEE) {
      return (
        <ProjectItemsFreelancer />
      )
    } else {
      return (
        <ContentWrapper>
          Signing...
        </ContentWrapper>
      )
    }
  }
}

export const Home = connect(
  maps.mapStateToProps,
  maps.mapDispatchToProps,
)(HomeScreen)

