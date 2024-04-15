import Router from '../router'
import { Api } from '../Api'
import { Message } from '@arco-design/web-vue'

export const getToken = () => {
  return sessionStorage.getItem('token')
}

export const setToken = (token) => {
  sessionStorage.setItem('token', token)
}

export const decodeToken = (token) => {
  let base64Url = token.split('.')[1]
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  let jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  return JSON.parse(jsonPayload)
}

export const register = async (userData) => {
  try {
    await Api.post(`/users`, userData)
    userData.userType = 'User'
    login(userData)
  } catch (err) {
    Message.error(err.message)
  }
}

export const login = async (userData) => {
  const { email, password, userType } = userData

  const loginData = {
    email: email,
    password: password
  }

  try {
    if (userType === 'User') {
      const response = await Api.post(`/users/login`, loginData)
      const token = response.data
      setToken(token)
      // redirect to user account
      Router.push('/useraccount')
    } else if (userType === 'Manager') {
      const response = await Api.post(`/managers/login`, loginData)
      const token = response.data
      setToken(token)
      Router.push('/manager')
    }
  } catch (err) {
    Message.error(err.message)
  }
}

export const getUser=()=>{
   const token=getToken()
  return token ? decodeToken(token) : ''
  
}

export const logout = () => {
  sessionStorage.clear()
  Router.push('/login')
}
