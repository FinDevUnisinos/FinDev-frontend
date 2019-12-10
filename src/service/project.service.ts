import CONFIG from 'config/enviroments.config'
import axios from 'axios'

export interface ISkillTableItem {
  "skillId": number,
  "level": number
}

export default class ProjectService {

  static getProjectsAndInterestedFreelancers(){
    return axios({
      method: 'POST',
      url: `${CONFIG.API_URL}/project/interests/all`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token
      },
    })
  }

  static getProjectsAvailableForFreelancers() {
    return axios({
      method: 'POST',
      url: `${CONFIG.API_URL}/project/skills/all/employee`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token
      },
    })
  }

  static getProjectsOfCompany() {
    return axios({
      method: 'POST',
      url: `${CONFIG.API_URL}/project/skills/all/company`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token
      },
    })
  }

  static addInterestOnProject(projectId: number, positive: boolean) {
    return axios({
      method: 'POST',
      url: `${CONFIG.API_URL}/project/interests/insert`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token
      },
      data: {
        projectId,
        positive
      },
    })
  }

  static removeInterestOnProject(projectId: number, positive: boolean) {
    return axios({
      method: 'POST',
      url: `${CONFIG.API_URL}/project/interests/remove`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token
      },
      data: {
        projectId,
        positive
      },
    })
  }

  static addInterestOnFreelancer(projectId: number, userId: number, hasCompanyInterest: boolean) {
    return axios({
      method: 'POST',
      url: `${CONFIG.API_URL}/project/interests/update`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token
      },
      data: {
        projectId,
        userId,
        hasCompanyInterest
      },
    })
  }

  static editProject(projectId: number){
    return axios({
      method: 'POST',
      url: `${CONFIG.API_URL}/project/edit`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token
      },
      data: {
        projectId
      },
    })
  }

  static closeProject(projectId: number){
    return axios({
      method: 'POST',
      url: `${CONFIG.API_URL}/project/close`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token
      },
      data: {
        id: projectId
      },
    })
  }

  static addProject(
    name: string,
    description: string,
    listSkills: ISkillTableItem[]
    ){
    return axios({
      method: 'POST',
      url: `${CONFIG.API_URL}/project/insert`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token
      },
      data: {
        name,
        description,
        listSkills,
      },
    })
  }

  static getProjectsLikedByUser() {
    return axios({
      method: 'POST',
      url: `${CONFIG.API_URL}/user/projects/liked`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token
      },
    })
  }

  }
