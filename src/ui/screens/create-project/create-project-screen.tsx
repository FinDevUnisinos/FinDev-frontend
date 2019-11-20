import React, { PureComponent } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ScreensConstants } from 'constants/index'
import { Redirect } from 'react-router-dom'
import { ContentWrapper } from 'components/index'
import {
  InputLabel, Table, TableHead,
  TableBody, TableCell, TableRow, NativeSelect
} from '@material-ui/core'
import "./create-project-screen.css"
import { AxiosResponse, AxiosError } from 'axios'
import ProjectService, { ISkillTableItem } from 'service/project.service'
import SkillService from 'service/skill.service'

interface CreateProjectProps { }

interface CreateProjectState {
  name: string,
  description: string,
  skillId: number,
  level: number,
  listSkills: ISkillTableItem[],
  error: boolean,
  shouldRedirect: boolean,
  refresh: boolean,
  skillsData: any
}

export class CreateProjectScreen extends PureComponent<CreateProjectProps, CreateProjectState>{
  constructor(props: CreateProjectProps) {
    super(props)

    this.state = {
      name: '',
      description: '',
      skillId: 1,
      level: 1,
      listSkills: [],
      error: false,
      shouldRedirect: false,
      refresh: false,
      skillsData: []
    }

    this.renderAddSkill = this.renderAddSkill.bind(this)
    this.deleteSkill = this.deleteSkill.bind(this)
    this.includeSkill = this.includeSkill.bind(this)
    this.renderItemTable = this.renderItemTable.bind(this)
    this.loadEachSkill = this.loadEachSkill.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.render = this.render.bind(this)
    this.refreshSkillsContent = this.refreshSkillsContent.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.redirectToProjectPage = this.redirectToProjectPage.bind(this)
  }

  onSubmit() {
    ProjectService.addProject(
      this.state.name,
      this.state.description,
      this.state.listSkills
    )
      .then((response: AxiosResponse) => {
        this.setState({
          shouldRedirect: true,
        })

      })
      .catch((error: AxiosError) => {
        this.setState({
          error: true,
        })
      })
  }

  handleChange(event: React.ChangeEvent<{
    name?: string;
    value: unknown;
  }>) {
    const target = event.currentTarget
    const value = target.value
    let nameloc = target.name
    nameloc = nameloc == undefined ? "" : nameloc
    this.setState({
      [nameloc]: value
    } as Pick<CreateProjectState, any>)
  }

  refreshSkillsContent() {
    SkillService.getAllSkills()
      .then((response: AxiosResponse) => {
        this.setState(
          {
            ...this.state,
            skillsData: response.data,
          }
        )
      })
      .catch((error: AxiosError) => {
        console.log(error)
      })
  }

  componentDidMount() {
    this.refreshSkillsContent()
  }

  includeSkill(): void {

    let hasItemYet = false
    this.state.listSkills.forEach(element => {
      hasItemYet = hasItemYet || element.skillId == this.state.skillId
    });

    if (!hasItemYet) {
      this.state.listSkills.push(
        {
          "skillId": this.state.skillId,
          "level": this.state.level
        }
      )

      this.setState({
        refresh: !this.state.refresh
      } as Pick<CreateProjectState, any>)
    }
  }

  deleteSkill(value: number): void {

    delete this.state.listSkills[value]

    this.setState({
      refresh: !this.state.refresh
    } as Pick<CreateProjectState, any>)
  }

  loadEachSkill(skill: any): any {
    return (
      <option value={skill.id}>{skill.description}</option>
    )
  }

  renderAddSkill(): JSX.Element {
    return (
      <Grid container
        direction="row"
        spacing={1}
      >
        <Grid item
          xs={3}
        >
          <InputLabel>Skill</InputLabel>
          <NativeSelect
            className="create-project-select"
            value={this.state.skillId}
            onChange={this.handleChange}
            inputProps={{
              name: 'skillId',
              id: 'skillId'
            }}
          >
            {this.state.skillsData.map(this.loadEachSkill)}
          </NativeSelect>
        </Grid>
        <Grid item
          xs={3}
        >
          <InputLabel>Level</InputLabel>
          <NativeSelect
            className="create-project-select"
            value={this.state.level}
            onChange={this.handleChange}
            inputProps={{
              name: 'level',
              id: 'level'
            }}
          >
            <option value={1}>One</option>
            <option value={2}>Two</option>
            <option value={3}>Three</option>
          </NativeSelect>
        </Grid>
        <Grid item
          xs={3}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={this.includeSkill}
          >
            Add skill
          </Button>
        </Grid>
      </Grid>
    )
  }

  renderItemTable(skillItem: any, i: number): JSX.Element {
    return (
      <TableRow>
        <TableCell component="th" scope="row">
          {skillItem.skillId}
        </TableCell>
        <TableCell align="right">
          {skillItem.level}
        </TableCell>
        <TableCell align="right">
          <Button
            variant="contained"
            color="secondary"
            onClick={
              () => {
                this.deleteSkill(i)
              }
            }
          >
            Remove
        </Button>
        </TableCell>
      </TableRow>
    )
  }

  renderTable(): JSX.Element {
    return (
      <Grid container>
        <Table aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Skill</TableCell>
              <TableCell align="right">Level</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.listSkills.map(this.renderItemTable)}
          </TableBody>
        </Table>
      </Grid>
    )
  }

  redirectToProjectPage(): JSX.Element {
    if (this.state.shouldRedirect) {
      return <Redirect to={ScreensConstants.COMPANYPROJECTS} />
    }

    return <div />
  }

  render(): JSX.Element {
    return (
      <ContentWrapper>
        {this.redirectToProjectPage()}
        <div className="create-project-body">
          <Typography component="h1" variant="h5" >
            New project
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Project name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={this.handleChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
            autoComplete="description"
            autoFocus
            onChange={this.handleChange}
            rows={3}
            rowsMax={5}
            multiline={true}
          />
          {this.renderAddSkill()}
          {this.renderTable()}
          <Grid container
            direction="row"
            justify="center"
            alignItems="center"
            className="create-project-submit-button"
          >
            <Grid item
              xs={6}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={this.onSubmit}
              >
                Create project
            </Button>
            </Grid>
          </Grid>
        </div>
      </ContentWrapper>
    )
  }
}
