import React, { PureComponent } from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ContentWrapper } from 'components/index'
import {
    InputLabel, Table, TableHead,
    TableBody, TableCell, TableRow, NativeSelect
} from '@material-ui/core'
import "./edit-user-skills.css"
import { AxiosResponse, AxiosError } from 'axios'
import UserService, { ISkillTableItem } from 'service/user.service'
import SkillService from 'service/skill.service'

interface EditUserSkillsProps { }

interface EditUserSkillsState {
    skillId: number,
    level: number,
    listSkills: ISkillTableItem[],
    error: boolean,
    skillsData: any,
    userSkillsData: any
}

export class EditUserSkillsScreen extends PureComponent<EditUserSkillsProps, EditUserSkillsState>{
    constructor(props: EditUserSkillsProps) {
        super(props)

        this.state = {
            skillId: 1,
            level: 1,
            listSkills: [],
            error: false,
            skillsData: [],
            userSkillsData: []
        }

        this.renderAddSkill = this.renderAddSkill.bind(this)
        this.deleteSkill = this.deleteSkill.bind(this)
        this.includeSkill = this.includeSkill.bind(this)
        this.renderItemTable = this.renderItemTable.bind(this)
        this.loadEachSkill = this.loadEachSkill.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.render = this.render.bind(this)
        this.refreshSkillsContent = this.refreshSkillsContent.bind(this)
        this.refreshUserSkills = this.refreshUserSkills.bind(this)
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
        } as Pick<EditUserSkillsState, any>)
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

    refreshUserSkills() {
        UserService.getUserSkills()
            .then((response: AxiosResponse) => {
                this.setState(
                    {
                        ...this.state,
                        userSkillsData: response.data,
                    }
                )
            })
            .catch((error: AxiosError) => {
                console.log(error)
            })
    }

    componentDidMount() {
        this.refreshSkillsContent()
        this.refreshUserSkills()
    }

    includeSkill(): void {

        UserService.addUserSkill(this.state.skillId,this.state.level)
        .then((response: AxiosResponse) => {
            this.refreshUserSkills()
        })
        .catch((error: AxiosError) => {
            console.log(error)
        })        
    }

    deleteSkill(value: number): void {

        UserService.removeUserSkill(value)
        .then((response: AxiosResponse) => {
            this.refreshUserSkills()
        })
        .catch((error: AxiosError) => {
            console.log(error)
        })
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
                        className="edit-user-skills-select"
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
                        className="edit-user-skills-select"
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
                    {skillItem.skill.description}
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
                                this.deleteSkill(skillItem.skill.id)
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
                        {this.state.userSkillsData[0] == undefined ?
                            "" :
                            this.state.userSkillsData[0].skillsUser.map(this.renderItemTable)}
                    </TableBody>
                </Table>
            </Grid>
        )
    }


    render(): JSX.Element {
        return (
            <ContentWrapper>
                <div className="edit-user-skills-body">
                    <Typography component="h1" variant="h5" >
                        Manage Skills
          </Typography>

                    {this.renderAddSkill()}
                    {this.renderTable()}
                </div>
            </ContentWrapper>
        )
    }
}
