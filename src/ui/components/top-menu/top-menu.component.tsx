import React, { PureComponent } from 'react'
import { Grid, IconButton } from '@material-ui/core'
import "./top-menu.css"
import { Link, Redirect } from 'react-router-dom'
import { ScreensConstants } from 'constants/index'

interface ITopMenuPropType { }

interface ITopMenuStateType { }

export class TopMenu extends PureComponent<ITopMenuPropType, ITopMenuStateType>{

  logout(): void{
    localStorage.clear()
  }
  renderUserData(): JSX.Element {
    return (
      <Grid
        xs={2}
        container
        item
        spacing={2}
        direction="row"
      >
        <Grid item>
          <i className="fas fa-user-circle top-menu-icon" />
        </Grid>
        <Grid
          item
          direction="column"
          justify="space-between"
        >
          <div className="top-menu-user-name">{localStorage.userName}</div>
          <div className="top-menu-user-title">{localStorage.userType}</div>
        </Grid>
      </Grid>
    )
  }

  render(): JSX.Element {
    return (
      <div className="top-menu-container">
        <Grid
          container
          xs={12}
          spacing={2}
          justify="flex-end"
        >
          <Link to={ScreensConstants.LOGIN}
            className="fa fa-sign-out top-menu-logout"
            onClick={this.logout}>
          </Link>
          {this.renderUserData()}
        </Grid>
      </div>
    )
  }
}
