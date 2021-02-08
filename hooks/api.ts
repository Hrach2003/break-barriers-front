import axios, { AxiosStatic } from 'axios'
import { get } from 'js-cookie'

export const baseURL = 'https://break-barriers.herokuapp.com'

export const getAPI = (): AxiosStatic => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${get('jwt_token')}`
  axios.defaults.baseURL = `${baseURL}/api`
  return axios
}
