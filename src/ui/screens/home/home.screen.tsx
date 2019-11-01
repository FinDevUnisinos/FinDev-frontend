import React, { PureComponent } from 'react'
import maps from './home.map'
import { connect } from 'react-redux'
import { LateralAccessMenu, IMenuItemType, ContentWrapper, TopMenu } from 'components/index'
import { ProjectItemsFreelancer } from './components/project-items-freelancer/project-items-freelancer.component'
import './home.css'
import { UserTypes } from 'constants/userType.constants'

interface HomeProps {
  number: number,
  increment: () => any,
  decrement: () => any,
}

interface StateType {
}

export class HomeScreen extends PureComponent<HomeProps, StateType> {

  constructor(props: HomeProps) {
    super(props)
  }

  getFreelancerMenu(): IMenuItemType[] {
    return [
      {
        text: 'Projects',
        path: '/',
        isMain: true,
      },
      {
        text: 'Liked',
        path: '/',
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

  getCompanyMenu(): IMenuItemType[] {
    return [
      {
        text: 'FreeLancers',
        path: '/',
        isMain: true,
      },
      {
        text: 'Projects',
        path: '/',
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


  render(): JSX.Element {
    if (localStorage.userType == UserTypes.COMPANY) {
      return (
        <ContentWrapper>
          <LateralAccessMenu menuItens={this.getCompanyMenu()} />
          <div className="home-content">
            <TopMenu />

          </div>
        </ContentWrapper>
      )
    } else if (localStorage.userType == UserTypes.EMPLOYEE) {
      return (
        <ContentWrapper>
          <LateralAccessMenu menuItens={this.getFreelancerMenu()} />
          <div className="home-content">
            <TopMenu />
            <ProjectItemsFreelancer />
          </div>
        </ContentWrapper>
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

