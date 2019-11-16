import CONFIG from 'config/enviroments.config'
import axios from 'axios'

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

  static addProject(){
    return axios({
      method: 'POST',
      url: `${CONFIG.API_URL}/project/add`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token
      },
    })
  }
}
