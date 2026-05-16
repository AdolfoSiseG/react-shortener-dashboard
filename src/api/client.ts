import axios, {
  AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios'
import type { ProblemDetails } from '@/types'
import {
  getAccessToken,
  getRefreshToken,
  setSession,
  clearAuth,
} from '@/lib/authStore'
import { refreshTokens } from '@/api/refresh'

const baseURL = import.meta.env.VITE_API_URL

export const api = axios.create({ baseURL })

// Attach the in-memory access token to every request.
api.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Single-flight refresh: concurrent 401s await ONE refresh call. The refresh
// token rotates on every use, so firing it twice would consume a token the
// server already revoked and log the user out mid-session (plan pitfall).
let refreshPromise: Promise<string> | null = null

async function runRefresh(): Promise<string> {
  const refreshToken = getRefreshToken()
  if (!refreshToken) throw new Error('No refresh token')

  const data = await refreshTokens(refreshToken)
  setSession(data) // stores the rotated refresh token immediately
  return data.accessToken
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ProblemDetails>) => {
    const original = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined
    const status = error.response?.status

    const isRefreshCall = original?.url?.includes('/api/auth/refresh')

    if (status === 401 && original && !original._retry && !isRefreshCall) {
      original._retry = true
      try {
        if (!refreshPromise) {
          refreshPromise = runRefresh().finally(() => {
            refreshPromise = null
          })
        }
        const newToken = await refreshPromise
        original.headers.Authorization = `Bearer ${newToken}`
        return api(original)
      } catch {
        clearAuth()
        // Hard redirect on auth loss: drops all in-memory app and query
        // state, which is the correct posture when the session is gone.
        if (window.location.pathname !== '/login') {
          window.location.assign('/login')
        }
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  },
)
