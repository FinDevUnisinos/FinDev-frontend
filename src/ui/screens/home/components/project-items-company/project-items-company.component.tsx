import React, { PureComponent } from "react";
import { Grid, Button } from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import "./project-items-company.css";
import ProjectService from "../../../../../service/project.service";
import { AxiosError, AxiosResponse } from "axios";
import IconButton from "@material-ui/core/IconButton";
import { ContentWrapper } from "components/index";
import { Redirect } from "react-router-dom";
import { ScreensConstants } from "constants/index";

interface IProjectItemsCompanyPropType {}

interface IProjectItemsCompanyStateType {
  data: any;
  error: boolean;
  shouldRedirectToNewProject: boolean;
  shouldRedirectToUpdateProject: boolean;
  name: string;
  description: string;
  id: number;
  skills: any;
}

export class ProjectItemsCompany extends PureComponent<
  IProjectItemsCompanyPropType,
  IProjectItemsCompanyStateType
> {
  constructor(props: IProjectItemsCompanyPropType) {
    super(props);

    this.state = {
      data: [],
      error: false,
      shouldRedirectToNewProject: false,
      shouldRedirectToUpdateProject: false,
      name: "",
      description: "",
      id: 0,
      skills: []
    };

    this.renderSkill = this.renderSkill.bind(this);
    this.renderItemProject = this.renderItemProject.bind(this);
    this.editProject = this.editProject.bind(this);
    this.closeProject = this.closeProject.bind(this);
    this.addProject = this.addProject.bind(this);
    localStorage.currentPath = ScreensConstants.COMPANYPROJECTS;
  }

  refreshContent() {
    ProjectService.getProjectsOfCompany()
      .then((response: AxiosResponse) => {
        this.setState({
          ...this.state,
          data: response.data
        });
        console.log(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.refreshContent();
  }

  addProject(): void {
    this.setState({
      shouldRedirectToNewProject: true
    });
  }

  closeProject(projectId: string): void {
    ProjectService.closeProject(Number.parseInt(projectId))
      .then((response: AxiosResponse) => {
        console.log(response.data);
        new Promise(resolve => setTimeout(resolve, 500));
        this.refreshContent();
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }

  editProject(id: number): void {
    this.setState({
      shouldRedirectToUpdateProject: true
    });
  }

  setName(name: string): void {
    this.setState({
      name: name
    });
  }

  setDescription(description: string): void {
    this.setState({
      description: description
    });
  }

  setId(id: string): void {
    this.setState({
      id: Number.parseInt(id)
    });
  }

  setSkills(skills: any):void{
    this.setState({
      skills: skills
    });
  }

  renderSkill(skillItem: any): JSX.Element {
    return (
      <Grid item className="project-items-company-skill-text">
        {skillItem.skill && skillItem.skill.description} (
        {skillItem.level == null ? "No skills!" : skillItem.level})
      </Grid>
    );
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
            <Grid item className="project-item-title">
              {projectItem.name}
            </Grid>

            <Grid item className="project-items-company-text">
              {projectItem.description}
            </Grid>

            <Grid item>
              <div className="project-item-skills-title">Skills</div>
              <div className="project-skills">
                {projectItem.skillsProject.map(this.renderSkill)}
              </div>
            </Grid>

            <Grid
              container
              spacing={2}
              justify="center"
              alignItems="center"
              direction="row"
            >
              {this.state.shouldRedirectToUpdateProject && (
                <Redirect
                  to={{
                    pathname: ScreensConstants.NEW_PROJECT,
                    state: this.state
                  }}
                />
              )}
              <IconButton
                color="primary"
                onClick={() => {
                  this.setName(projectItem.name);
                  this.setDescription(projectItem.description);
                  this.setId(projectItem.id);
                  this.setSkills(projectItem.skillsProject)
                  this.setDescription(projectItem.description);
                  this.editProject(projectItem.id);
                }}
                className="fas fa-pencil-alt project-items-company-edit-icon"
              ></IconButton>

              <IconButton
                color="secondary"
                onClick={() => {
                  this.closeProject(projectItem.id);
                }}
                className="far fa-times-circle project-items-company-delete-icon"
              ></IconButton>
            </Grid>
          </div>
        </div>
      </Grid>
    );
  }

  render(): JSX.Element {
    return (
      <ContentWrapper>
        {this.state.shouldRedirectToNewProject && (
          <Redirect to={ScreensConstants.NEW_PROJECT} />
        )}
        <GridList className="project-items-company-grid-list">
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
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
          {this.state.data.map(this.renderItemProject)}
        </GridList>
      </ContentWrapper>
    );
  }
}
