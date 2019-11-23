import React, { PureComponent } from 'react'
import { Grid } from '@material-ui/core'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import "./freelancers-items-company.css"
import ProjectService from '../../../../../service/project.service'
import { AxiosError, AxiosResponse } from 'axios'
import IconButton from '@material-ui/core/IconButton';
import { ContentWrapper } from 'components/index';
import { FreelancerItem } from './frelancer-item.component';

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

    this.renderItemProject = this.renderItemProject.bind(this)
    this.refreshContent = this.refreshContent.bind(this);

  }

  refreshContent() {
    ProjectService.getProjectsAndInterestedFreelancers()
      .then((response: AxiosResponse) => {
        this.setState(
          {
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

  renderItemProject(projectItem: any, index: number): JSX.Element {

    return (
      <GridList className="freelancer-items-company-grid-list">
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">Freelancers interested in {projectItem.name}</ListSubheader>
        </GridListTile>
        {projectItem.interestsProject.map((item: any) => {

          return <FreelancerItem
            projectId={Number.parseInt(projectItem.id)}
            freelancerItem={item}
            refresh = {this.refreshContent}
          />
        })}
        }
      </GridList>
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
