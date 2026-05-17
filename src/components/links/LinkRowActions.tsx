import { EditLinkSheet } from '@/components/links/EditLinkSheet'
import { DeleteLinkDialog } from '@/components/links/DeleteLinkDialog'
import type { ShortLinkDto } from '@/types'

// Each row owns its own edit/delete dialog state, so the table stays
// presentational and there is no shared "which row is open" state.
export function LinkRowActions({ link }: { link: ShortLinkDto }) {
  return (
    <>
      <EditLinkSheet link={link} />
      <DeleteLinkDialog link={link} />
    </>
  )
}
