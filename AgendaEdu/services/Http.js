import axios from 'axios'
import Config from '../env.json'

let instance = axios.create({
    baseURL: Config.BASE_URL    
})

instance.defaults.headers.common['Accept'] = 'application/json'
instance.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

export default instance;