import React from 'react'
import './App.css'
import { Home, LoginScreen } from 'screens/index'
import { Screens } from 'constants/index'
import { Provider } from 'react-redux'
import { store } from 'app_redux/index'

import { BrowserRouter, Route, Redirect } from 'react-router-dom'

interface AppProps { }

export class App extends React.Component<AppProps, {}> {
  render(): JSX.Element {
    return (
      <div className="App">
        <Provider store={store}>
          <BrowserRouter>
            <Route exact path={Screens.LOGIN} component={LoginScreen} />
            <Route exact path={Screens.HOME} component={Home} />
            <Redirect to={Screens.LOGIN} />
          </BrowserRouter>
        </Provider>
      </div>
    )
  }
}

export default App
