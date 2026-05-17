import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import { useDeleteLink } from '@/hooks/useLinks'
import { getErrorMessage } from '@/lib/problemDetails'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import type { ShortLinkDto } from '@/types'

interface DeleteLinkDialogProps {
  link: ShortLinkDto
  onDeleted?: () => void
}

export function DeleteLinkDialog({ link, onDeleted }: DeleteLinkDialogProps) {
  const mutation = useDeleteLink()

  function handleConfirm(e: React.MouseEvent) {
    // Keep the dialog mounted until the request settles so errors surface.
    e.preventDefault()
    mutation.mutate(link.id, {
      onSuccess: () => {
        toast.success('Link deleted')
        onDeleted?.()
      },
      onError: (error) => toast.error(getErrorMessage(error)),
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={`Delete ${link.shortCode}`}
        >
          <Trash2 className="size-4" aria-hidden="true" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this link?</AlertDialogTitle>
          <AlertDialogDescription>
            <code>{link.shortCode}</code> will stop redirecting
            immediately. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
