import axios from 'axios'
import { toast } from 'react-toastify'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
})

// Attack token to all requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle 401 Unauthorized (token expired or invalid)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error('Session expired! Please login again')
      localStorage.removeItem('token')
      setTimeout(() => {
        window.location.href = '/login'
      }, 1000)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
