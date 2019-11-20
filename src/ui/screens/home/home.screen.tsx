import React, { PureComponent } from 'react'
import maps from './home.map'
import { connect } from 'react-redux'
import { ContentWrapper } from 'components/index'
import { ProjectItemsFreelancer } from './components/project-items-freelancer/project-items-freelancer.component'
import './home.css'
import { UserTypes } from 'constants/userType.constants'
import { FreelancersItemsCompany } from './components/freelancers-items-company/freelancers-items-company.component'
import { ScreensConstants } from 'constants/index'

interface HomeProps {
  number: number,
  increment: () => any,
  decrement: () => any,
}

interface StateType { }

export class HomeScreen extends PureComponent<HomeProps, StateType> {

  constructor(props: HomeProps) {
    super(props)
    localStorage.currentPath = ScreensConstants.HOME
  }

  render(): JSX.Element {
    if (localStorage.userType == UserTypes.COMPANY) {
      return (
        <FreelancersItemsCompany />
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

