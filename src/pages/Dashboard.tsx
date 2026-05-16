import { Link } from 'react-router-dom'

export function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white p-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <p className="text-sm text-gray-500">
        Protected shell and real widgets land in later chunks.
      </p>
      <Link
        to="/login"
        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100"
      >
        Go to login
      </Link>
    </main>
  )
}
