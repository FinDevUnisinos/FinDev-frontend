import React, { PureComponent } from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { Screens } from '../../../constants/index';

interface SignUpProps { }

export class signUpScreen extends PureComponent<SignUpProps, {}>{
    render(): JSX.Element {
        return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div>
            <Typography component="h1" variant="h5" >
                Sign up
            </Typography>

            <Grid item >
              <ToggleButtonGroup
                exclusive
                aria-label="text alignment"
              >
                <ToggleButton aria-label="left aligned">
                  Freelancer
                </ToggleButton>
                <ToggleButton  aria-label="centered">
                  Employer
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>

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
