import React, { PureComponent } from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import UserService from 'service/user.service'
import { AxiosError, AxiosResponse } from 'axios'
import { Link, Redirect } from 'react-router-dom'
import { ScreensConstants } from 'constants/index'
import { LogoImage } from 'assets/index'

import './login.css'

interface LoginProps { }

interface LoginState {
  email: string,
  password: string,
  error: boolean,
  shouldRedirect: boolean,
}

export class LoginScreen extends PureComponent<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props)

    this.state = {
      email: '',
      password: '',
      error: false,
      shouldRedirect: false,
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  redirectToLogin(): JSX.Element {
    if (this.state.shouldRedirect) {
      return <Redirect to={ScreensConstants.LOGIN} />
    }

    return <div />
  }


  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.currentTarget
    const value = target.value
    const name: string = target.name
    this.setState({
      [name]: value
    } as Pick<LoginState, any>)
  }

  onSubmit() {
    this.setState({
      error: false,
    })

    UserService.login(this.state.email, this.state.password)
      .then((response: AxiosResponse) => {
        localStorage.token = response.data

        UserService.getUser()
          .then((response: AxiosResponse) => {

            const localUserData = response.data

            localStorage.userName = localUserData.name
            localStorage.userType = localUserData.userType


            this.setState({
              shouldRedirect: true,
            })
          })
          .catch((error: AxiosError) => {
            this.setState({
              error: true,
            })
          })
      })
      .catch((error: AxiosError) => {
        this.setState({
          error: true,
        })
      })
  }

  redirectToHome(): JSX.Element {
    if (this.state.shouldRedirect) {
      return <Redirect to={ScreensConstants.HOME} />
    }

    return <div />
  }

  redirectToSignUp(): JSX.Element {
    if(this.state.shouldRedirect){
      return <Redirect to={ScreensConstants.SIGNUP}/>
    }

    return <div />
  }


  render(): JSX.Element {
    return (
      <Container component="main" maxWidth="xs">
        <img src={LogoImage} className="logo" />
        {this.redirectToHome()}
        <CssBaseline />
        <Typography component="h1" variant="h5" >
          Sign in
          </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={this.handleChange}
          className='test'
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={this.handleChange}
          error={this.state.error}
        />
        {this.state.error && <div className="password-error">Wrong password</div>}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={this.onSubmit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item>
            <Link to={ScreensConstants.SIGNUP}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Container>
    )
  }
}
