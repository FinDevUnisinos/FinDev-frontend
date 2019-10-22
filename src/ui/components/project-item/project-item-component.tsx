import React, { PureComponent } from 'react'
import { Grid } from '@material-ui/core'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import Container from '@material-ui/core/Container';

import "./project-item.css"

interface IProjectItemPropType { }

interface IProjectItemStateType { }

export class ProjectItem extends PureComponent<IProjectItemPropType, IProjectItemStateType>{

  renderSkill(skill: string, level: number): JSX.Element {
    return (
      <Grid
        item
        className="project-item-text"
      >
        {skill} ({level})
      </Grid>
    )
  }

  renderItemProject(): JSX.Element {
    return (
        <Grid
          className="project-item-container"
          item
          xs={6}
          sm={6}
          style={{height:"auto"}}
          spacing={0}
          justify="flex-start"
          direction="column"
        >
          <div style={{ padding: 10 }}>

            <Grid
              item
              className="project-item-text"
            >
              PROJECT NAME
          </Grid>


            <Grid
              item
              className="project-item-text"
            >
              PROJECT DESCRIPTION IS A LONG AND CURSIVE TEXT AND A BLA BLA BLA.
          </Grid>


            <Grid
              item
            >
              <strong>Skills</strong>
              {this.renderSkill("Node", 3)}
              {this.renderSkill("Typescript", 3)}
              {this.renderSkill("Node", 3)}
              {this.renderSkill("Typescript", 3)}
            </Grid>


            <Grid
              container
              spacing={2}
              justify="center"
              alignItems="center"
              direction="row"
            >

              <Grid item>
                <i className="far fa-heart project-item-icon" />
              </Grid>

              <Grid item>
                <i className="far fa-times-circle project-item-icon" />
              </Grid>

            </Grid>

          </div>

        </Grid>
    )
  }

  render(): JSX.Element {
    return (
      <GridList className="grid-list-project-items">
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">Projects</ListSubheader>
        </GridListTile>
        {this.renderItemProject()}
        {this.renderItemProject()}
        {this.renderItemProject()}
        {this.renderItemProject()}
        {this.renderItemProject()}
        {this.renderItemProject()}
      </GridList>
    )
  }
}
