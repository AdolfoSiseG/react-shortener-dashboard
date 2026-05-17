import { useState } from 'react'
import { useLinks, LINKS_PAGE_SIZE } from '@/hooks/useLinks'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import {
  LinksFilters,
  type StatusFilter,
} from '@/components/links/LinksFilters'
import { LinksTable } from '@/components/links/LinksTable'
import { LinksTableSkeleton } from '@/components/links/LinksTableSkeleton'
import { LinksPagination } from '@/components/links/LinksPagination'
import { EmptyLinks } from '@/components/links/EmptyLinks'
import { LinksError } from '@/components/links/LinksError'
import { CreateLinkDialog } from '@/components/links/CreateLinkDialog'
import { LinkRowActions } from '@/components/links/LinkRowActions'

export function Links() {
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState<StatusFilter>('all')
  const [searchInput, setSearchInput] = useState('')
  const search = useDebouncedValue(searchInput)

  // Reset to page 1 in the change handlers (not an effect) so a new
  // filter/search never lands the user on an out-of-range page.
  function handleStatusChange(value: StatusFilter) {
    setStatus(value)
    setPage(1)
  }
  function handleSearchChange(value: string) {
    setSearchInput(value)
    setPage(1)
  }

  const query = useLinks({
    page,
    status: status === 'all' ? undefined : status,
    search,
  })

  const isFiltered = status !== 'all' || search.trim() !== ''
  const totalCount = query.data?.totalCount ?? 0
  const totalPages = Math.max(1, Math.ceil(totalCount / LINKS_PAGE_SIZE))

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Links</h1>
          <p className="text-muted-foreground text-sm">
            Manage your short links.
          </p>
        </div>
        <CreateLinkDialog />
      </div>

      <LinksFilters
        status={status}
        onStatusChange={handleStatusChange}
        search={searchInput}
        onSearchChange={handleSearchChange}
      />

      {query.isLoading ? (
        <LinksTableSkeleton />
      ) : query.isError ? (
        <LinksError error={query.error} onRetry={() => query.refetch()} />
      ) : query.data && query.data.items.length > 0 ? (
        <div className="space-y-4">
          <LinksTable
            links={query.data.items}
            renderRowActions={(link) => <LinkRowActions link={link} />}
          />
          <LinksPagination
            page={page}
            totalPages={totalPages}
            totalCount={totalCount}
            disabled={query.isFetching}
            onPageChange={setPage}
          />
        </div>
      ) : (
        <EmptyLinks
          filtered={isFiltered}
          action={isFiltered ? undefined : <CreateLinkDialog />}
        />
      )}
    </div>
  )
}
