import { Badge } from '@/components/ui/badge'
import { isLinkExpired } from '@/lib/format'
import type { ShortLinkDto } from '@/types'

export function LinkStatusBadge({ link }: { link: ShortLinkDto }) {
  const expired = isLinkExpired(link)
  return (
    <Badge variant={expired ? 'outline' : 'default'}>
      {expired ? 'Expired' : 'Active'}
    </Badge>
  )
}
