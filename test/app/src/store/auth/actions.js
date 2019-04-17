import { axiosInstance } from 'boot/axios'
import { LocalStorage, SessionStorage } from 'quasar'

const REGISTER_ROUTE = '/auth/register'
const VERIFICATION_ROUTE = '/auth/verify'
const LOGIN_ROUTE = '/auth/login'
const FETCH_USER_ROUTE = '/auth/user'
const PASSWORD_FORGOT_ROUTE = '/auth/password/forgot'
const PASSWORD_RESET_ROUTE = '/auth/password/reset'

export function register (state, data) {
  return axiosInstance.post(REGISTER_ROUTE, data)
}

export function login (state, data) {
  const p = new Promise(function (resolve, reject) {
    return axiosInstance.post(LOGIN_ROUTE, data.body).then((response) => {
      state.commit('setUser', response.data.user.data)
      const token = response.data.token
      axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token
      if (data.rememberMe) {
        LocalStorage.set('token', token)
      } else {
        SessionStorage.set('token', token)
      }
      resolve()
    }).catch((error) => {
      reject(error)
    })
  })
  return p
}

export function setToken (state, token, rememberMe) {
  axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token
  if (rememberMe) {
    LocalStorage.set('token', token)
  } else {
    SessionStorage.set('token', token)
  }
}

export function fetch (state) {
  let token
  if (LocalStorage.has('token')) {
    token = LocalStorage.getItem('token')
  } else if (SessionStorage.has('token')) {
    token = SessionStorage.getItem('token')
  }
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token
    return axiosInstance.get(FETCH_USER_ROUTE).then((response) => {
      state.commit('setUser', response.data.data)
    })
  }
}

export function logout (state) {
  if (LocalStorage.has('token')) {
    LocalStorage.remove('token')
  } else if (SessionStorage.has('token')) {
    SessionStorage.remove('token')
  }
  state.commit('setUser', null)
}

export function verify (state, token) {
  return axiosInstance.get(VERIFICATION_ROUTE + '?token=' + token)
}
export function passwordForgot (state, data) {
  return axiosInstance.post(PASSWORD_FORGOT_ROUTE, data)
}

export function passwordReset (state, { token, data }) {
  return axiosInstance.post(PASSWORD_RESET_ROUTE + '?token=' + token, data)
}
