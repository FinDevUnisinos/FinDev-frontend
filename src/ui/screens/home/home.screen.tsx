import React, { PureComponent } from 'react'
import maps from './home.map'
import { connect } from 'react-redux'
import { LateralAccessMenu, IMenuItemType, ContentWrapper, TopMenu } from 'components/index'
import { ProjectItemsFreelancer } from './components/project-items-freelancer/project-items-freelancer.component'
import './home.css'
import LoginService from 'service/user.service'
import { AxiosError, AxiosResponse } from 'axios'

interface HomeProps {
  number: number,
  increment: () => any,
  decrement: () => any,
}

interface StateType {
  error: boolean,
  userType: string
}

export class HomeScreen extends PureComponent<HomeProps, StateType> {

  constructor(props: HomeProps) {
    super(props)

    this.state = {
      error: false,
      userType: "",
    }

  }

  componentWillMount() {
    let localUserType = ""
    LoginService.getUserType()
      .then((response: AxiosResponse) => {
        localUserType = response.data
        console.log(localUserType)
        this.setState({
          error: false,
          userType: localUserType,
        })
        console.log(this.state.userType)
      })
      .catch((error: AxiosError) => {
        this.setState({
          ...this.state,
          error: true,
        })
      })

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
    if (this.state.userType == "COMPANY") {
      return (
        <ContentWrapper>
          <LateralAccessMenu menuItens={this.getCompanyMenu()} />
          <div className="home-content">
            <TopMenu />

          </div>
        </ContentWrapper>
      )
    } else if (this.state.userType == "EMPLOYEE") {
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

