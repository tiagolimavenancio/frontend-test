import axios from 'axios'
import Session from './Session'
import Config from '../env.json'

let instance = axios.create({
    baseURL: Config.BASE_URL,
    timeout: 600000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }    
})

const configHeadersCredentials = (accessToken) => {
    instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}
  
(async () => {
  await Session.Credential.get('@Token:user').then((response) => {
    if(response) {
      configHeadersCredentials(response)
    }
  })
})()

export default instance;