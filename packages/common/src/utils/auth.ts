const TOKEN_KEY = 'geo_auth_token'

export const getAuthToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY)
}

export const setAuthToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token)
}

export const clearAuth = () => {
    localStorage.removeItem(TOKEN_KEY)
}
