import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { useLink } from '@/hooks/useLinks'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { CopyButton } from '@/components/CopyButton'
import { LinkStatusBadge } from '@/components/links/LinkStatusBadge'
import { LinksError } from '@/components/links/LinksError'
import { EditLinkSheet } from '@/components/links/EditLinkSheet'
import { DeleteLinkDialog } from '@/components/links/DeleteLinkDialog'
import { QrCard } from '@/components/links/QrCard'
import { formatDate, shortUrl } from '@/lib/format'

export function LinkDetail() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const query = useLink(id)

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" asChild className="-ml-2">
        <Link to="/links">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to links
        </Link>
      </Button>

      {query.isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-40 w-full" />
        </div>
      ) : query.isError ? (
        <LinksError error={query.error} onRetry={() => query.refetch()} />
      ) : query.data ? (
        (() => {
          const link = query.data
          const url = shortUrl(link.shortCode)
          return (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-semibold tracking-tight">
                    {link.title ?? link.shortCode}
                  </h1>
                  <LinkStatusBadge link={link} />
                </div>
                <div className="flex items-center gap-1">
                  <EditLinkSheet link={link} />
                  <DeleteLinkDialog
                    link={link}
                    onDeleted={() => navigate('/links', { replace: true })}
                  />
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Short link</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="flex items-center gap-1">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand font-medium hover:underline"
                    >
                      {url}
                    </a>
                    <CopyButton value={url} label="Copy short URL" />
                  </div>

                  <dl className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <dt className="text-muted-foreground">Destination</dt>
                      <dd className="truncate">
                        <a
                          href={link.originalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 hover:underline"
                        >
                          {link.originalUrl}
                          <ExternalLink
                            className="size-3 shrink-0"
                            aria-hidden="true"
                          />
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">
                        Password protected
                      </dt>
                      <dd>{link.hasPassword ? 'Yes' : 'No'}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Created</dt>
                      <dd>{formatDate(link.createdAt)}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Expires</dt>
                      <dd>{formatDate(link.expiresAt)}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <QrCard link={link} />

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Clicks over time, top countries, and devices arrive in
                    Fase 3.
                  </p>
                </CardContent>
              </Card>
            </div>
          )
        })()
      ) : null}
    </div>
  )
}
