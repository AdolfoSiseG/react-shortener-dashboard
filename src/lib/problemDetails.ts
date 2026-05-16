import { AxiosError } from 'axios'
import type { ProblemDetails } from '@/types'

// Turn any thrown value into a user-facing message. Prefers RFC 7807
// `detail`/`title` from the backend; special-cases 429 rate limiting
// (brief sec. 7).
export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const status = error.response?.status
    const pd = error.response?.data as ProblemDetails | undefined

    if (status === 429) {
      const retryAfter = error.response?.headers?.['retry-after']
      return retryAfter
        ? `Too many requests. Try again in ${retryAfter}s.`
        : 'Too many requests. Please wait and try again.'
    }
    if (pd?.detail) return pd.detail
    if (pd?.title) return pd.title
    if (error.code === 'ERR_NETWORK') {
      return 'Cannot reach the server. Check your connection and try again.'
    }
    return error.message
  }
  return 'Something went wrong. Please try again.'
}
