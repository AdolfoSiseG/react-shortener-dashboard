import { Link } from 'react-router-dom'

export function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold text-gray-900">Login</h1>
      <p className="text-sm text-gray-500">
        Auth form arrives in the next chunk.
      </p>
      <Link
        to="/"
        className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
      >
        Go to dashboard
      </Link>
    </main>
  )
}
