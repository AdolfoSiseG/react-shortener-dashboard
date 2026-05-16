// Shown while the auth bootstrap (refresh-token exchange) is in flight, so
// guarded routes do not flash the wrong screen before the session resolves.
export function RouteLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen items-center justify-center"
    >
      <span className="text-muted-foreground text-sm">Loading...</span>
    </div>
  )
}
