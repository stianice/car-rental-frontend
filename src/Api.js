
import { getToken } from './utils/auth'
import axios from 'axios'
import { message } from 'ant-design-vue';
export const Api = axios.create({
  // import.meta.env.VITE_APP_API_ENDPOINT ||
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json'
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

    return res;
}),
  (err) => {
    if (err.response.state == 401) {
      sessionStorage.clear();
    }
    message.error(err.response.data.message);
    return err.response;
  }
