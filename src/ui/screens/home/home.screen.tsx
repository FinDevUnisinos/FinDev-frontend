import React, { PureComponent } from 'react'
import maps from './home.map'
import { connect } from 'react-redux'

interface HomeProps {
  number: number,
  increment: () => any,
  decrement: () => any,
}

interface StateType { }

export class HomeScreen extends PureComponent<HomeProps, StateType> {
  render(): JSX.Element {
    return (
      <div>
        <div>
          number: {this.props.number}
        </div>
        <button onClick={this.props.increment}>increment</button>
        <button onClick={this.props.decrement}>decrement</button>
      </div>
    )
  }
}

export const Home = connect(
  maps.mapStateToProps,
  maps.mapDispatchToProps,
)(HomeScreen)

