import CONFIG from 'config/enviroments.config'
import axios from 'axios'

export interface ISkillTableItem {
  "skillId": number,
  "skillName": string,
  "level": number
}

export default class UserService {

  static login(email: string, password: string) {
    return axios({
      method: 'POST',
      url: `${CONFIG.API_URL}/user/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email,
        password
      },
    })
  }

  static getUser() {
    return axios({
      method: 'POST',
      url: `${CONFIG.API_URL}/user/getUser`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
      }
    })
  }

  static signUp(name: string, email: string, password: string, userType: string) {
    return axios({
      method: 'POST',
      url: `${CONFIG.API_URL}/user/signup`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        name,
        email,
        password,
        userType
      },
    })
  }


  static getUserSkills() {
    return axios({
      method: 'POST',
      url: `${CONFIG.API_URL}/user/skills/all`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
      }
    })
  }

  static addUserSkill(skillId:number, level:number) {
    return axios({
      method: 'POST',
      url: `${CONFIG.API_URL}/user/skills/insert`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
      },
      data:{
        skillId,
        level,
      }
    })
  }

  static removeUserSkill(skillId:number) {
    return axios({
      method: 'POST',
      url: `${CONFIG.API_URL}/user/skills/delete`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
      },
      data:{
        skillId,
      }
    })
  }


  static editPofile(
    listSkills: ISkillTableItem[]
  ) {
    return axios({
      method: 'POST',
      url: `${CONFIG.API_URL}/user/edit`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token
      },
      data: {
        listSkills,
      },
    })
  }
}