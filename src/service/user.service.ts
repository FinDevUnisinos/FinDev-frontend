import CONFIG from 'config/enviroments.config'
import axios from 'axios'

export default class LoginService {
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

  static signUp(name: string,email: string, password: string, userType: string) {
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
}

