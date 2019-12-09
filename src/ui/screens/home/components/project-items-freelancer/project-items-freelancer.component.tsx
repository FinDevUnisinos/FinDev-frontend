import React, { PureComponent } from 'react'
import { Grid } from '@material-ui/core'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import "./project-items-freelancer.css"
import ProjectService from '../../../../../service/project.service'
import { AxiosError, AxiosResponse } from 'axios'
import IconButton from '@material-ui/core/IconButton';
import { ContentWrapper } from 'components/index';

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
    this.renderMyItemProject = this.renderMyItemProject.bind(this)
    this.addInterestOnProject = this.addInterestOnProject.bind(this)
    this.getProjectsAndInterestedFreelancers = this.getProjectsAndInterestedFreelancers.bind(this)
  }

  refreshContent() {
    ProjectService.getProjectsAvailableForFreelancers()
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

  componentDidMount() {
    this.refreshContent()
  }

  addInterestOnProject(projectId: string, positive: boolean): void {
    ProjectService.addInterestOnProject(Number.parseInt(projectId), positive)
      .then((response: AxiosResponse) => {
        console.log(response.data)
        //wait a second
        new Promise( resolve => setTimeout(resolve, 1000) )
        this.refreshContent()
      })
      .catch((error: AxiosError) => {
        console.log(error)
      })
  }

  renderSkill(skillItem: any): JSX.Element {
    return (
      <Grid
        item
        className="project-items-freelancer-skill-text"
      >
        {skillItem.skill && skillItem.skill.description} ({skillItem.level == null ? "No skills!" : skillItem.level})
      </Grid>
    )
  }

  getProjectsAndInterestedFreelancers(): void {
    ProjectService.getProjectsAndInterestedFreelancers()
      .then((response: AxiosResponse) => {
        console.log(response.data)
        //wait a second
        new Promise( resolve => setTimeout(resolve, 1000) )
        this.refreshContent()
      })
      .catch((error: AxiosError) => {
        console.log(error)
      })
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
        <div className="project-items-freelancer-subcontainer">
          <div className="project-items-freelancer-subsubcontainer">
            <Grid
              item
              className="project-item-title"
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
              <div className="project-item-skills-title">Skills</div>
              <div className="project-skills">
                {
                  projectItem.skillsProject.map(
                    this.renderSkill
                  )
                }
              </div>
            </Grid>


            <Grid
              container
              spacing={2}
              justify="center"
              alignItems="center"
              direction="row"
            >
              <IconButton
                color="primary"
                onClick={() => {
                  this.addInterestOnProject(projectItem.id, true);
                }}
                className="far fa-heart project-items-freelancer-like-icon"
              ></IconButton>

              <IconButton
                color="secondary"
                onClick={() => {
                  this.addInterestOnProject(projectItem.id, false);
                }}
                className="far fa-times-circle project-items-freelancer-dislike-icon"
              ></IconButton>
            </Grid>

          </div>
        </div>

      </Grid>
    )
  }

  renderMyItemProject(projectItem: any): JSX.Element {
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
        <div className="project-items-freelancer-subcontainer">
          <div className="project-items-freelancer-subsubcontainer">
            <Grid
              item
              className="project-item-title"
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
              <div className="project-item-skills-title">Skills</div>
              <div className="project-skills">
                {
                  projectItem.skillsProject.map(
                    this.renderSkill
                  )
                }
              </div>
            </Grid>


            <Grid
              container
              spacing={2}
              justify="center"
              alignItems="center"
              direction="row"
            >
              <IconButton
                color="primary"
                onClick={() => {
                  this.addInterestOnProject(projectItem.id, true);
                }}
                className="far fa-heart project-items-freelancer-like-icon"
              ></IconButton>

              <IconButton
                color="secondary"
                onClick={() => {
                  this.addInterestOnProject(projectItem.id, false);
                }}
                className="far fa-times-circle project-items-freelancer-dislike-icon"
              ></IconButton>
            </Grid>

          </div>
        </div>

      </Grid>
    )
  }

  render(): JSX.Element {
    return (
      <ContentWrapper>
        <GridList className="project-items-freelancer-grid-list">
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">Available Projects</ListSubheader>
          </GridListTile>
          {
            this.state.data.map(
              this.renderItemProject
            )
          }
        </GridList>
        <GridList className="project-items-freelancer-grid-list">
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">My Projects</ListSubheader>
          </GridListTile>
          {
            this.state.data.map(
              this.renderMyItemProject
            )
          }
        </GridList>
      </ContentWrapper>

    )
  }
}
