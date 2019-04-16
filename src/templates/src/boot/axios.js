import axios from 'axios'

const axiosInstance = axios

export default ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
}

export { axiosInstance }