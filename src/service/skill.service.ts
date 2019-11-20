import CONFIG from 'config/enviroments.config'
import axios from 'axios'

export default class SkillService {

  static getAllSkills() {
    return axios({
      method: 'POST',
      url: `${CONFIG.API_URL}/skill/all`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
      }
    })
  }

}
