import { create } from 'apisauce'
import Session from './Session'
import Config from '../env.json'

const instance = create({
    baseURL: Config.BASE_URL,
    timeout: 600000,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }      
})

instance.addAsyncRequestTransform(request => async () => {
  const token = await Session.Credential.get('@AgendaEdu:token')
  if(token)
    request.headers['token'] = token
})

export default instance;