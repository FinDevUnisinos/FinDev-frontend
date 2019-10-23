import React, { PureComponent } from 'react'
import { Grid } from '@material-ui/core'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import "./project-items-freelancer.css"
import ProjectService from '../../../service/project.service'
import { AxiosError, AxiosResponse } from 'axios'

interface IProjectItemsFreelancerPropType { }

interface IProjectItemsFreelancerStateType {
  data: any,
  error: boolean,
}

export class ProjectItemsFreelancer extends PureComponent<IProjectItemsFreelancerPropType, IProjectItemsFreelancerStateType>{
  constructor(props: IProjectItemsFreelancerPropType) {
    super(props)

    this.state = {
      data: [],
      error: false,
    }
    this.renderSkill = this.renderSkill.bind(this)
    this.renderItemProject = this.renderItemProject.bind(this)
  }

  componentDidMount() {
    ProjectService.getProjects()
      .then((response: AxiosResponse) => {
        this.setState(
          {
            ...this.state,
            data: response.data,
          }
        )
        console.log(response.data)

      })
      .catch((error: AxiosError) => {
        console.log(error)
      })
  }

  renderSkill(skillItem: any): JSX.Element {
    return (
      <Grid
        item
        className="project-items-freelancer-text"
      >
        {skillItem.skill && skillItem.skill.description} ({skillItem.level == null ? "No skills!" : skillItem.level})
      </Grid>
    )
  }

  renderItemProject(projectItem: any): JSX.Element {
    return (
      <Grid
        className="project-items-freelancer-container"
        item
        xs={6}
        sm={6}
        style={{ height: "auto" }}
        spacing={0}
        justify="flex-start"
        direction="column"
      >
        <div style={{ padding: 10 }}>

          <Grid
            item
            className="project-items-freelancer-text"
          >
            {projectItem.name}
          </Grid>


          <Grid
            item
            className="project-items-freelancer-text"
          >
            {projectItem.description}
          </Grid>


          <Grid
            item
          >
            <strong>Skills</strong>
            {
              projectItem.skillsProject.map(
                this.renderSkill
              )
            }
          </Grid>


          <Grid
            container
            spacing={2}
            justify="center"
            alignItems="center"
            direction="row"
          >

            <Grid item>
              <i className="far fa-heart project-items-freelancer-icon" />
            </Grid>

            <Grid item>
              <i className="far fa-times-circle project-items-freelancer-icon" />
            </Grid>

          </Grid>

        </div>

      </Grid>
    )
  }

  render(): JSX.Element {
    return (
      <GridList className="project-items-freelancer-grid-list">
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">Projects</ListSubheader>
        </GridListTile>
        {
          this.state.data.map(
            this.renderItemProject
          )
        }
      </GridList>
    )
  }
}