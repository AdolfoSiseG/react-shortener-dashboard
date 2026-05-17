import { Button } from '@/components/ui/button'

interface LinksPaginationProps {
  page: number
  totalPages: number
  totalCount: number
  disabled?: boolean
  onPageChange: (page: number) => void
}

export function LinksPagination({
  page,
  totalPages,
  totalCount,
  disabled,
  onPageChange,
}: LinksPaginationProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-muted-foreground text-sm">
        {totalCount} link{totalCount === 1 ? '' : 's'} · page {page} of{' '}
        {totalPages}
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={disabled || page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={disabled || page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
