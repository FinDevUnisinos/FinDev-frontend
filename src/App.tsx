import React from 'react'
import './App.css'
import { ScreensConstants } from 'constants/index'
import { Provider } from 'react-redux'
import { store } from 'app_redux/index'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { } from 'screens/index'
import { 
  Home,
  LoginScreen,
  SignUpScreen, 
  CreateProjectScreen, 
  EditUserSkillsScreen 
} from 'screens/index'
import { ProjectItemsFreelancer, ProjectLikedFreelancer, ProjectItemsCompany } from 'screens/home/components/index'

interface AppProps { }

export class App extends React.Component<AppProps, {}> {
  render(): JSX.Element {
    return (
      <div className="App">
        <Provider store={store}>
          <BrowserRouter>
            <Route exact path={ScreensConstants.LOGIN} component={LoginScreen} />
            <Route exact path={ScreensConstants.HOME} component={Home} />
            <Route exact path={ScreensConstants.SIGNUP} component={SignUpScreen} />
            <Route exact path={ScreensConstants.COMPANYPROJECTS} component={ProjectItemsCompany} />
            <Route exact path={ScreensConstants.FREELANCERPROJECTS} component={ProjectItemsFreelancer} />
            <Route exact path={ScreensConstants.NEW_PROJECT} component={CreateProjectScreen} />
            <Route exact path={ScreensConstants.MANAGE_SKILLS} component={EditUserSkillsScreen} />
            <Route exact path={ScreensConstants.MANAGE_PROJECTS} component={ProjectLikedFreelancer} />
            <Redirect to={ScreensConstants.LOGIN} />
          </BrowserRouter>
        </Provider>
      </div>
    )
  }
}

export default App
