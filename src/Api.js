
import { getToken } from './utils/auth'
import axios from 'axios'

export const Api = axios.create({
  // import.meta.env.VITE_APP_API_ENDPOINT ||
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

Api.interceptors.request.use(
  (x) => {
    const token = getToken()
    x.headers['Authorization'] = 'Bearer ' + token
    return x
  },
  (err) => {
    console.error(err)
    return err
  }
)

Api.interceptors.response.use((res) => {

    return res.data;
}),
  err => {
    if (err.response.state == 401) {
      sessionStorage.clear();
    } 
   
    return Promise.reject(err);
  }
