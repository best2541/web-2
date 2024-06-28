import axios from "axios"

const baseURL = process.env.REACT_APP_BASE_URL // change base url
const headers = {}

if (localStorage.accessToken) {
  headers.Authorization = `Bearer ${localStorage.accessToken}`
}

const axiosInstance = axios.create({
  baseURL,
  headers
})

// axiosInstance.interceptors.response.use(
//   response => {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     return response
//   },
//   error => {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     const { response } = error
//     if (response && response.status === 500) {
//       // Redirect to /login if the response status is 500
//       window.localStorage.removeItem('accessToken')
//       window.localStorage.removeItem('email')
//       window.localStorage.removeItem('refreshToken')
//       window.localStorage.removeItem('userData')
//       window.location.href = '/'
//     }
//     return Promise.reject(error)
//   }
// )
export default axiosInstance
