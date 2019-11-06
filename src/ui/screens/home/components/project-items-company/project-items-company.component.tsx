import React, { PureComponent } from 'react'
import { Grid, Button } from '@material-ui/core'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import "./project-items-company.css"
import ProjectService from '../../../../../service/project.service'
import { AxiosError, AxiosResponse } from 'axios'
import IconButton from '@material-ui/core/IconButton';
import { ContentWrapper } from 'components/index'

interface IProjectItemsCompanyPropType { }

interface IProjectItemsCompanyStateType {
  data: any,
  error: boolean,
}

export class ProjectItemsCompany extends PureComponent<IProjectItemsCompanyPropType, IProjectItemsCompanyStateType>{
  constructor(props: IProjectItemsCompanyPropType) {
    super(props)

    this.state = {
      data: [],
      error: false,
    }
    this.renderSkill = this.renderSkill.bind(this)
    this.renderItemProject = this.renderItemProject.bind(this)
    this.editProject = this.editProject.bind(this)
    this.deleteProject = this.deleteProject.bind(this)
  }

  refreshContent() {
    ProjectService.getProjectsOfCompany()
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

  editProject(projectId: string): void {
    ProjectService.editProject(Number.parseInt(projectId))
      .then((response: AxiosResponse) => {
        console.log(response.data)
        new Promise( resolve => setTimeout(resolve, 500) )
        this.refreshContent()
      })
      .catch((error: AxiosError) => {
        console.log(error)
      })
  }

  deleteProject(projectId: string): void{
    ProjectService.editProject(Number.parseInt(projectId))
      .then((response: AxiosResponse) => {
        console.log(response.data)
        new Promise( resolve => setTimeout(resolve, 500) )
        this.refreshContent()
      })
      .catch((error: AxiosError) => {
        console.log(error)
      })
  }

  addProject(): void{
    ProjectService.addProject()
      .then((response: AxiosResponse) => {
        console.log(response.data)
        new Promise( resolve => setTimeout(resolve, 500) )
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
        className="project-items-company-skill-text"
      >
        {skillItem.skill && skillItem.skill.description} ({skillItem.level == null ? "No skills!" : skillItem.level})
      </Grid>
    )
  }

  renderItemProject(projectItem: any): JSX.Element {
    return (
      <Grid
        className="project-items-company-container"
        item
        xs={6}
        sm={6}
        style={{ height: "auto" }}
        spacing={0}
        justify="flex-start"
        direction="column"
      >
        <div className="project-items-company-subcontainer">
          <div className="project-items-company-subsubcontainer">
            <Grid
              item
              className="project-item-title"
            >
              {projectItem.name}
            </Grid>


            <Grid
              item
              className="project-items-company-text"
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
                  this.editProject(projectItem.id);
                }}
                className="fas fa-pencil-alt project-items-company-edit-icon"
              ></IconButton>

              <IconButton
                color="secondary"
                onClick={() => {
                  this.deleteProject(projectItem.id);
                }}
                className="far fa-times-circle project-items-company-delete-icon"
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
        <GridList className="project-items-company-grid-list">
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">
              <IconButton
                color="primary"
                onClick={() => {
                  this.addProject();
                }}
                className="fas fa-plus project-items-company-delete-icon"
              ></IconButton>
              Projects
            </ListSubheader>
          </GridListTile>
          {
            this.state.data.map(
              this.renderItemProject
            )
          }
        </GridList>
      </ContentWrapper>
    )
  }
}