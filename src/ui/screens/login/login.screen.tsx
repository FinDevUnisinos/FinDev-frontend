import React, { PureComponent } from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Screens } from 'constants/index';

// import './login.css'

interface LoginProps { }

interface LoginState {
  email: string,
  password: string,
}

function handleClick() {
  <Link href={Screens.HOME}></Link>
};

export class LoginScreen extends PureComponent<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.currentTarget
    const value = target.value
    const name: string = target.name
    this.setState({
      [name]: value
    } as Pick<LoginState, any>)
  }

  onSubmit(){

  }

  render(): JSX.Element {
    const test = process.env

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <Typography component="h1" variant="h5" >
            Sign in
          </Typography>
          <form>
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
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}
