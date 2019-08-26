import React from 'react'
import './App.css'
import { HomeScreen, LoginScreen } from 'screens/index'
import { Screens } from 'constants/index'

import { BrowserRouter, Route, Redirect } from "react-router-dom"

interface AppProps { }

export class App extends React.Component<AppProps, {}> {
  render(): JSX.Element {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path={Screens.LOGIN} component={LoginScreen} />
          <Route exact path={Screens.HOME} component={HomeScreen} />
          <Redirect to={Screens.LOGIN} />
        </BrowserRouter>
      </div>
    )
  }
}

export default App
