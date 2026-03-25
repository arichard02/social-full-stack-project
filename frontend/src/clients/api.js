import axios from 'axios'

export const userClient = axios.create({
     baseURL: 'http://localhost:3000/api/users'
})

export const postClient = axios.create({
     baseURL: 'http://localhost:3000/api/posts'
})

// use the latest version of the token in local storage
postClient.interceptors.request.use((req) => {
     const token = localStorage.getItem('token')
     if (token) {
          req.headers.Authorization = `Bearer ${token}`
     }
     return req
})