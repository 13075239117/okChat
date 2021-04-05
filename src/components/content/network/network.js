// import axios from 'axios'
// export default function request(config) {
//     const instance = axios.create({
//         baseURL: '/api',
//         timeout: 50000,
//         // changeOrigin:true
//     });
//     instance.interceptors.request.use(config => {
//         return config
//     }, err => {
//         console.log(err)
//     })
//     instance.interceptors.response.use(res => {
//         return res.data
//     }, err => {
//         console.log(err)
//     })
//     return instance(config)
// }