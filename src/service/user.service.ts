import CONFIG from 'config/enviroments.config'
import axios from 'axios'

export default class LoginService {
  static login(email: string, password: string) {
    return axios.post(`${CONFIG.API_URL}/user/login`, {
      email,
      password
    })
  }
}
