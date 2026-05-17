import { useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Download } from 'lucide-react'
import { queryKeys } from '@/api/queryKeys'
import { getLinkQrBlob } from '@/api/links'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { getErrorMessage } from '@/lib/problemDetails'
import type { ShortLinkDto } from '@/types'

const QR_SIZE = 300

export function QrCard({ link }: { link: ShortLinkDto }) {
  const query = useQuery({
    queryKey: queryKeys.linkQr(link.id, QR_SIZE),
    queryFn: () => getLinkQrBlob(link.id, QR_SIZE),
    // The QR for a given link/size never changes; no need to refetch.
    staleTime: Infinity,
  })

  // Derive the object URL from the blob (instead of setState-in-effect) and
  // revoke it on change/unmount so the blob is not leaked.
  const objectUrl = useMemo(
    () => (query.data ? URL.createObjectURL(query.data) : null),
    [query.data],
  )
  useEffect(() => {
    if (!objectUrl) return
    return () => URL.revokeObjectURL(objectUrl)
  }, [objectUrl])

  function handleDownload() {
    if (!objectUrl) return
    const a = document.createElement('a')
    a.href = objectUrl
    a.download = `qr-${link.shortCode}.png`
    a.click()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">QR code</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        {query.isLoading ? (
          <Skeleton className="size-44 rounded-md" />
        ) : query.isError ? (
          <div role="alert" className="space-y-2 text-center">
            <p className="text-muted-foreground text-sm">
              {getErrorMessage(query.error)}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => query.refetch()}
            >
              Try again
            </Button>
          </div>
        ) : objectUrl ? (
          <>
            <img
              src={objectUrl}
              width={176}
              height={176}
              alt={`QR code linking to the short URL for ${link.shortCode}`}
              className="rounded-md border"
            />
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="size-4" aria-hidden="true" />
              Download PNG
            </Button>
          </>
        ) : null}
      </CardContent>
    </Card>
  )
}
