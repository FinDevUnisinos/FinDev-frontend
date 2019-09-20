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

interface SignUpProps { }

interface SignUpState {
  email: string,
  password: string,
  userType: string,
  error: boolean,
  shouldRedirect: boolean,
}

export class signUpScreen extends PureComponent<SignUpProps, SignUpState>{
  constructor(props: SignUpProps){
    super(props)

    this.state = {
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

  render(): JSX.Element {
        return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div>
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
                >
                Sign Up
                </Button>
                <Grid container>
                <Grid item>
                    <Link href="#" variant="body2">
                    {"Already have an account? Sign In"}
                    </Link>
                </Grid>
                </Grid>
            </form>
            </div>
        </Container>
    );

    }
}
