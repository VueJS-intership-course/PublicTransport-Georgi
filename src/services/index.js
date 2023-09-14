import axios from 'axios'
import { BASE_API_URL } from '@/utils/constants.js'

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    auth: '123mfdsakdnq',
  }
})

axiosInstance.interceptors.request.use((config) => {

  config.headers = {
    'Access-Control-Allow-Origin': '*'
  }

  return config
}, (err) => {
  console.error(err)
})

// axiosInstance.interceptors.response.use((res) => {
//   console.warn(res);
//   let result = []

//   for (let i = 0; i < 100; i++) {
//     result.push(res[i].data)
//   }

//   res.data = {result, time: Date.now() }
//   return res
// }, (err) => {
//   console.error(err)
// })


export default axiosInstance