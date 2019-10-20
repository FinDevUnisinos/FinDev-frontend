import React, { PureComponent } from 'react'
import { Grid } from '@material-ui/core'
import "./top-menu.css"

interface ITopMenuPropType { }

interface ITopMenuStateType { }

export class TopMenu extends PureComponent<ITopMenuPropType, ITopMenuStateType>{

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
          <div className="top-menu-user-name">Username</div>
          <div className="top-menu-user-title">Subtitle</div>
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
          <Grid item>
            <i className="fas fa-bell top-menu-icon" />
          </Grid>
          {this.renderUserData()}
        </Grid>
      </div>
    )
  }
}
