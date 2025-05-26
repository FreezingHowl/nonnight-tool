import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import {clearAuth, getAuthToken} from './auth'

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch'

const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASEURL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        'X-Client-Type': 'web'
    }
})

// 统一请求拦截器
http.interceptors.request.use(config => {
    const token = getAuthToken()
    if (token && !config.headers?.Authorization) {
        config.headers!.Authorization = `Bearer ${token}`
    }
    return config
})

// 统一响应拦截器
http.interceptors.response.use(
    (response: AxiosResponse) => handleSuccess(response),
    error => handleError(error)
)

/**
 * 统一成功处理
 *
 * @param response
 */
function handleSuccess (response: AxiosResponse) {
    // 成功响应处理
    if (response.data.code !== 0) {
        return Promise.reject(response.data)
    }
    return response.data.data
}

/**
 * 统一错误处理
 *
 * @param error
 */
function handleError (error: any) {
    // 统一错误处理
    const status = error.response?.status

    if (status === 401) {
        clearAuth()
        window.location.href = '/login'
    }

    return Promise.reject({
        code: status || 500,
        message: error.message,
        data: error.response?.data
    })
}

/**
 * 创建请求方法
 *
 * @param method
 */
function createRequest<T>(method: HttpMethod) {
    return (url: string, data?: object, config?: AxiosRequestConfig) => {
        const isPayloadMethod = ['post', 'put', 'patch'].includes(method)
        return http.request<T>({
            url,
            method,
            data: isPayloadMethod ? data : null,
            params: !isPayloadMethod ? data : null,
            ...config
        })
    }
}

// 导出各请求方法
export const getOfAxios = <T>(url: string, config?: AxiosRequestConfig) =>
    createRequest<T>('get')(url, undefined, config)

export const postOfAxios = <T>(url: string, data?: object, config?: AxiosRequestConfig) =>
    createRequest<T>('post')(url, data, config)

export const putOfAxios = <T>(url: string, data?: object, config?: AxiosRequestConfig) =>
    createRequest<T>('put')(url, data, config)

export const deleteOfAxios = <T>(url: string, data?: object, config?: AxiosRequestConfig) =>
    createRequest<T>('delete')(url, data, config)

export const patchOfAxios = <T>(url: string, data?: object, config?: AxiosRequestConfig) =>
    createRequest<T>('patch')(url, data, config)

export const createCancelToken = () => {
    return axios.CancelToken.source()
}
