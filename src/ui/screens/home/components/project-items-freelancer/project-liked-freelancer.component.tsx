import React, { PureComponent } from "react";
import { Grid } from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import "./project-items-freelancer.css";
import ProjectService from "../../../../../service/project.service";
import { AxiosError, AxiosResponse } from "axios";
import IconButton from "@material-ui/core/IconButton";
import { ContentWrapper } from "components/index";

interface IProjectLikedFreelancerPropType {}

interface IProjectLikedFreelancerStateType {
  data: any;
  error: boolean;
}

export class ProjectLikedFreelancer extends PureComponent<
  IProjectLikedFreelancerPropType,
  IProjectLikedFreelancerStateType
> {
  constructor(props: IProjectLikedFreelancerPropType) {
    super(props);

    this.state = {
      data: [],
      error: false
    };

    this.renderItemProject = this.renderItemProject.bind(this);
    this.addInterestOnProject = this.addInterestOnProject.bind(this);
    this.renderInterestsProjectsData = this.renderInterestsProjectsData.bind(
      this
    );
  }
  refreshContent() {
    ProjectService.getProjectsLikedByUser()
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

  addInterestOnProject(projectId: string): void {
    ProjectService.addInterestOnProject(Number.parseInt(projectId), false)
      .then((response: AxiosResponse) => {
        console.log(response.data);
        //wait a second
        new Promise(resolve => setTimeout(resolve, 1000));
        this.refreshContent();
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }

  renderInterestsProjectsData(interestsProjects: any): JSX.Element {
    return (
      <div className="project-items-freelancer-subcontainer">
        <div className="project-items-freelancer-subsubcontainer">
          <Grid item className="project-item-title">
            {interestsProjects.project.name}
          </Grid>
          <Grid item className="roject-items-freelancer-text">
            {interestsProjects.project.description}
          </Grid>
          <Grid
            container
            spacing={2}
            justify="center"
            alignItems="center"
            direction="row"
          >
            <IconButton
              color="secondary"
              onClick={() => {
                this.addInterestOnProject(interestsProjects.project.id);
              }}
              className="far fa-times-circle project-items-freelancer-dislike-icon"
            ></IconButton>
          </Grid>
        </div>
      </div>
    );
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
        {projectItem.interestsProjects.map(this.renderInterestsProjectsData)}
      </Grid>
    );
  }
  render(): JSX.Element {
    return (
      <ContentWrapper>
        <GridList className="project-items-freelancer-grid-list">
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div">My Liked Projects</ListSubheader>
          </GridListTile>
          {this.state.data.map(this.renderItemProject)}
        </GridList>
      </ContentWrapper>
    );
  }
}
