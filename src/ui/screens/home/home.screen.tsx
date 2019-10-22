import React, { PureComponent } from 'react'
import maps from './home.map'
import { connect } from 'react-redux'
import { LateralAccessMenu, IMenuItemType, ContentWrapper, TopMenu, ProjectItem} from 'components/index'

import './home.css'

interface HomeProps {
  number: number,
  increment: () => any,
  decrement: () => any,
}

interface StateType { }

export class HomeScreen extends PureComponent<HomeProps, StateType> {

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

  render(): JSX.Element {
    return (
      <ContentWrapper>
        <LateralAccessMenu menuItens={this.getFreelancerMenu()} />
        <div className="home-content">
          <TopMenu />
          <ProjectItem />
          <div>
            number: {this.props.number}
          </div>
          <button onClick={this.props.increment}>increment</button>
          <button onClick={this.props.decrement}>decrement</button>
        </div>
      </ContentWrapper>
    )
  }
}

export const Home = connect(
  maps.mapStateToProps,
  maps.mapDispatchToProps,
)(HomeScreen)

