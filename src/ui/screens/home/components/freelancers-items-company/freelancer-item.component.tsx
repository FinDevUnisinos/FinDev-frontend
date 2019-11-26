import React, { PureComponent } from 'react'
import { Grid } from '@material-ui/core'
import "./freelancers-items-company.css"
import IconButton from '@material-ui/core/IconButton';
import ProjectService from 'service/project.service';
import { AxiosResponse, AxiosError } from 'axios';

interface IFreelancerItemPropType {
  projectId: number,
  freelancerItem: any,
  refresh: any
}

interface IFreelancerItemStateType {
}

export class FreelancerItem extends PureComponent<IFreelancerItemPropType, IFreelancerItemStateType>{
  constructor(props: IFreelancerItemPropType) {
    super(props)

    this.addInterestOnFreelancer = this.addInterestOnFreelancer.bind(this)
    this.renderSkill = this.renderSkill.bind(this)

  }

  addInterestOnFreelancer(projectId: number, userId: number, hasCompanyInterest: boolean): void {
    ProjectService.addInterestOnFreelancer(
      projectId,
      userId,
      hasCompanyInterest
    )
      .then((response: AxiosResponse) => {
        //wait half-second
        new Promise(resolve => setTimeout(resolve, 500))
        this.props.refresh()
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

  render(): JSX.Element {
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
              {this.props.freelancerItem.user.name}
            </Grid>
            <Grid
              item
              className="freelancer-item-email"
            >
              {this.props.freelancerItem.hasCompanyInterest == true ? this.props.freelancerItem.user.email : ""}
            </Grid>


            <Grid
              item
            >
              <div className="project-item-skills-title">Skills</div>
              <div className="project-skills">
                {
                  this.props.freelancerItem.user.skillsUser.map(
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
                className={
                  this.props.freelancerItem.hasCompanyInterest == true ?
                    "fas fa-heart project-items-freelancer-like-icon" :
                    "far fa-heart project-items-freelancer-like-icon"
                }
                onClick={() => {
                  this.addInterestOnFreelancer(
                    this.props.projectId,
                    Number.parseInt(this.props.freelancerItem.user.id),
                    true
                  )
                }}
              ></IconButton>

              <IconButton
                color="secondary"
                className="far fa-times-circle project-items-freelancer-dislike-icon"
                onClick={() => {
                  this.addInterestOnFreelancer(
                    this.props.projectId,
                    Number.parseInt(this.props.freelancerItem.user.id),
                    false
                  )
                }}
              ></IconButton>
            </Grid>
          </div>
        </div>
      </Grid>
    )
  }

}
