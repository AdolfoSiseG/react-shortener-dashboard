import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { AuthResponse, UserDto } from '@/types'
import { setSession, clearAuth, getRefreshToken } from '@/lib/authStore'
import { refreshTokens } from '@/api/refresh'
import { logout as logoutRequest } from '@/api/auth'

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

interface AuthContextValue {
  user: UserDto | null
  status: AuthStatus
  // Called by Login/Register after a successful auth call.
  setSessionFromAuth: (auth: AuthResponse) => void
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDto | null>(null)
  // Lazy initial state from storage avoids a synchronous setState in the
  // bootstrap effect: with no refresh token we are already 'unauthenticated'.
  const [status, setStatus] = useState<AuthStatus>(() =>
    getRefreshToken() ? 'loading' : 'unauthenticated',
  )

  // Guards against React StrictMode double-invoking the bootstrap effect:
  // calling refresh twice would consume the rotating refresh token a second
  // time and the server would reject the (now revoked) first response.
  const bootstrapped = useRef(false)

  useEffect(() => {
    if (bootstrapped.current) return
    bootstrapped.current = true

    const token = getRefreshToken()
    if (!token) return

    refreshTokens(token)
      .then((auth) => {
        setSession(auth)
        setUser(auth.user)
        setStatus('authenticated')
      })
      .catch(() => {
        clearAuth()
        setStatus('unauthenticated')
      })
  }, [])

  function setSessionFromAuth(auth: AuthResponse) {
    setSession(auth)
    setUser(auth.user)
    setStatus('authenticated')
  }

  async function signOut() {
    const token = getRefreshToken()
    if (token) {
      try {
        await logoutRequest(token)
      } catch {
        // Best-effort server revoke; local cleanup happens regardless.
      }
    }
    clearAuth()
    setUser(null)
    setStatus('unauthenticated')
  }

  return (
    <AuthContext.Provider
      value={{ user, status, setSessionFromAuth, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Provider and its hook intentionally co-locate; not an HMR boundary.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within <AuthProvider>')
  }
  return ctx
}
