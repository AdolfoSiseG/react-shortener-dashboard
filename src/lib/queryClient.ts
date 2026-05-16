import { QueryClient } from '@tanstack/react-query'

// One QueryClient at the app root (brief sec. 7): 30s staleTime keeps the
// UI snappy without hammering the API; window-focus refetch is noisy in
// dev but desirable in the deployed demo.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: import.meta.env.PROD,
    },
  },
})
