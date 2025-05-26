import type { AxiosRequestConfig } from 'axios'

declare module 'axios' {
    export interface AxiosInstance {
        get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
        post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
        put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
        delete<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
        patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
    }
}

export interface PaginatedResponse<T> {
    data: T[]
    total: number
    page: number
}
