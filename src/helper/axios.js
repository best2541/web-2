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

export default axiosInstance
