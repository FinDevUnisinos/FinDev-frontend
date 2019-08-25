import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Screens } from '../../../constants/index'

interface LoginProps { }

export class LoginScreen extends PureComponent<LoginProps, {}> {
  render(): JSX.Element {
    return (
      <div>
        <Link to={Screens.HOME}>to home</Link>
      </div>
    )
  }
}

