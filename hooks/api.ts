import axios, { AxiosStatic } from 'axios'
import { get } from 'js-cookie'

export const getAPI = (): AxiosStatic => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${get('jwt_token')}`
  axios.defaults.baseURL = 'https://break-barriers.herokuapp.com/api'
  return axios
}
