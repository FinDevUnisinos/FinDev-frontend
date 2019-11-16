import React, { PureComponent } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ScreensConstants } from 'constants/index'
import { Link as RouterLink } from 'react-router-dom';
import { ContentWrapper } from 'components/index'
import {
  Select, MenuItem, InputLabel, Table, TableHead,
  TableBody, TableCell, TableRow
} from '@material-ui/core';


import "./create-project-screen.css"

interface CreateProjectProps { }

interface CreateProjectState { }

export class CreateProjectScreen extends PureComponent<CreateProjectProps, CreateProjectState>{

  renderAddSkill(): JSX.Element {
    return (
      <Grid container
        direction="row"
        spacing={1}
      >
        <Grid item
          xs={3}
        >
          <InputLabel>Skill</InputLabel>
          <Select className="create-project-select">
            <MenuItem value={1}>Test 1</MenuItem>
            <MenuItem value={2}>Test 2</MenuItem>
            <MenuItem value={3}>Test 3</MenuItem>
          </Select>
        </Grid>
        <Grid item
          xs={3}
        >
          <InputLabel>Level</InputLabel>
          <Select className="create-project-select">
            <MenuItem value={1}>Test 1</MenuItem>
            <MenuItem value={2}>Test 2</MenuItem>
            <MenuItem value={3}>Test 3</MenuItem>
          </Select>
        </Grid>
        <Grid item
          xs={3}
        >
          <Button
            variant="contained"
            color="primary"
          >
            Add skill
              </Button>
        </Grid>
      </Grid>
    )
  }

  renderTable(): JSX.Element {
    return (
      <Grid container>
        <Table aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Skill</TableCell>
              <TableCell align="right">Level</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                React
            </TableCell>
              <TableCell align="right">
                3
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="secondary"
                >
                  Remove
              </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    )
  }

  render(): JSX.Element {
    return (
      <ContentWrapper>
        <div className="create-project-body">
          <Typography component="h1" variant="h5" >
            New project
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="project-name"
            label="Project name"
            name="project-name"
            autoComplete="name"
            autoFocus
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="project-description"
            label="Description"
            name="project-description"
            autoComplete="email"
            autoFocus
            rows={3}
            rowsMax={5}
            multiline={true}
          />
          {this.renderAddSkill()}
          {this.renderTable()}
          <Grid container
            direction="row"
            justify="center"
            alignItems="center"
            className="create-project-submit-button"
          >
            <Grid item
              xs={6}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
              >
                Create project
            </Button>
            </Grid>
          </Grid>
        </div>
      </ContentWrapper>
    )
  }
}
