import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:3001',
})

// Alter defaults after axiosInstance has been created
axiosInstance.defaults.headers.common['x-jonsoku'] = 'x-jonsoku-value'

export default axiosInstance
