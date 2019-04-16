import { axiosInstance } from 'boot/axios'
import { LocalStorage, SessionStorage } from 'quasar'


const REGISTER_ROUTE = '<%= prompts.register_route %>'
const VERIFICATION_ROUTE = '<%= prompts.verification_route %>'
const LOGIN_ROUTE = '<%= prompts.login_route %>'
const FETCH_USER_ROUTE = '<%= prompts.fetch_user_route %>'
const PASSWORD_FORGOT_ROUTE = '<%= prompts.password_forgot_route %>'
const PASSWORD_RESET_ROUTE = '<%= prompts.password_reset_route %>'

export function register (state, data) {
  return axiosInstance.post(REGISTER_ROUTE, data)
}

export function login (state, data) {
  return axiosInstance.post(LOGIN_ROUTE, data)
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
