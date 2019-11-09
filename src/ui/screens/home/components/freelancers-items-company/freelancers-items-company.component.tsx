import React, { PureComponent } from 'react'
import { Grid } from '@material-ui/core'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import "./freelancers-items-company.css"
import ProjectService from '../../../../../service/project.service'
import { AxiosError, AxiosResponse } from 'axios'
import IconButton from '@material-ui/core/IconButton';
import { ContentWrapper } from 'components/';

interface IFreelancersItemsCompanyPropType { }

interface IFreelancersItemsCompanyStateType {
  data: any,
  error: boolean,
}

export class FreelancersItemsCompany extends PureComponent<IFreelancersItemsCompanyPropType, IFreelancersItemsCompanyStateType>{
  constructor(props: IFreelancersItemsCompanyPropType) {
    super(props)

    this.state = {
      data: [],
      error: false,
    }
    this.renderSkill = this.renderSkill.bind(this)
    this.renderItemProject = this.renderItemProject.bind(this)
    this.renderItemFreelancer = this.renderItemFreelancer.bind(this)
  }

  refreshContent() {
    ProjectService.getProjectsAndInterestedFreelancers()
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

  renderItemProject(projectItem: any): JSX.Element {
    return (
      <GridList className="freelancer-items-company-grid-list">
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">Freelancers interested in {projectItem.name}</ListSubheader>
        </GridListTile>
        {
          projectItem.interestsProject.map(
            this.renderItemFreelancer
          )
        }
      </GridList>
    )
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

  renderItemFreelancer(freelancerItem: any): JSX.Element {
    return (
      <Grid
        className="freelancers-items-company-container"
        item
        xs={6}
        sm={6}
        style={{ height: "auto" }}
        spacing={0}
        justify="flex-start"
        direction="column"
      >
        <div className="freelancers-items-company-subcontainer">
          <div className="freelancers-items-company-subsubcontainer">
            <Grid
              item
              className="freelancer-item-name "
            >
              {freelancerItem.user.name}
            </Grid>


            <Grid
              item
            >
              <div className="project-item-skills-title">Skills</div>
              <div className="project-skills">
                {
                  freelancerItem.user.skillsUser.map(
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
                className="far fa-heart project-items-freelancer-like-icon"
              ></IconButton>

              <IconButton
                color="secondary"
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
        {
          this.state.data.map(
            this.renderItemProject
          )
        }
      </ContentWrapper>
    )
  }
}
