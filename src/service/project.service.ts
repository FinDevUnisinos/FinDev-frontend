import CONFIG from 'config/enviroments.config'
import axios from 'axios'

export default class ProjectService {
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

}
