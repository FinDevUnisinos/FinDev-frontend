import React, { PureComponent } from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LoginService from 'service/user.service'
import { AxiosError, AxiosResponse } from 'axios'
import { Redirect } from 'react-router-dom'
import { ScreensConstants } from 'constants/index'
import { Link as RouterLink } from 'react-router-dom';

interface SignUpProps { }
interface SignUpState {
  name: string,
  email: string,
  password: string,
  userType: string,
  error: boolean,
  shouldRedirect: boolean,
}
export class signUpScreen extends PureComponent<SignUpProps, SignUpState>{
  constructor(props: SignUpProps) {
    super(props)

    this.state = {
      name: '',
      email: '',
      password: '',
      userType: '',
      error: false,
      shouldRedirect: false,
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.currentTarget
    const value = target.value
    const name: string = target.name
    this.setState({
      [name]: value
    } as Pick<SignUpState, any>)
  }

  onSubmit() {
    this.setState({
      error: false,
    })

    LoginService.signUp(this.state.name, this.state.email, this.state.password)
      .then((response: AxiosResponse) => {
        localStorage.token = response.data
        this.setState({
          shouldRedirect: true,
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

  render(): JSX.Element {
    return (
      <Container component="main" maxWidth="xs">
        {this.redirectToHome()}
        <CssBaseline />
        <Typography component="h1" variant="h5" >
          Sign up
        </Typography>

        <RadioGroup aria-label="position" name="position" row>
          <FormControlLabel
            value="Employee"
            control={<Radio color="primary" />}
            label="Employee"
            labelPlacement="end"
          />
          <FormControlLabel
            value="Company"
            control={<Radio color="primary" />}
            label="Company"
            labelPlacement="end"
          />
        </RadioGroup>

        <form>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={this.handleChange}
          />

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
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={this.onSubmit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link
                component={RouterLink} to={ScreensConstants.LOGIN}
                href="#"
                variant="body2" >
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    );

  }
}
