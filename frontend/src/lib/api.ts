import axios from 'axios'

const api = axios.create({
  baseURL: 'https://formai-mwwx.onrender.com/api/v1'
})

api.interceptors.request.use((config) => {
  const token = window.sessionStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

export default api