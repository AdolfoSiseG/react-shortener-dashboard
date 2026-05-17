import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { CopyButton } from '@/components/CopyButton'
import { LinkStatusBadge } from '@/components/links/LinkStatusBadge'
import { formatDate, shortUrl } from '@/lib/format'
import type { ShortLinkDto } from '@/types'

interface LinksTableProps {
  links: ShortLinkDto[]
  // Per-row edit/delete actions are injected by the page (added in the
  // CRUD chunk) so this table stays presentational.
  renderRowActions?: (link: ShortLinkDto) => ReactNode
}

export function LinksTable({ links, renderRowActions }: LinksTableProps) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Short code</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Expires</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {links.map((link) => (
            <TableRow key={link.id}>
              <TableCell className="max-w-[12rem] truncate font-medium">
                {link.title ?? '—'}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <code className="text-sm">{link.shortCode}</code>
                  <CopyButton
                    value={shortUrl(link.shortCode)}
                    label={`Copy short URL for ${link.shortCode}`}
                  />
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground max-w-[16rem] truncate">
                <a
                  href={link.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground hover:underline"
                >
                  {link.originalUrl}
                </a>
              </TableCell>
              <TableCell>
                <LinkStatusBadge link={link} />
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDate(link.createdAt)}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDate(link.expiresAt)}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-1">
                  {renderRowActions?.(link)}
                  <Button variant="ghost" size="icon-sm" asChild>
                    <Link
                      to={`/links/${link.id}`}
                      aria-label={`View details for ${link.shortCode}`}
                    >
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
