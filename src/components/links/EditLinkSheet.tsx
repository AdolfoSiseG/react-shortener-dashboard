import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Pencil } from 'lucide-react'
import { toast } from 'sonner'

import { useUpdateLink } from '@/hooks/useLinks'
import { getErrorMessage } from '@/lib/problemDetails'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import type { ShortLinkDto, UpdateShortLinkRequest } from '@/types'

const schema = z.object({
  title: z.string().optional(),
  expiresAt: z.string().optional(),
  isActive: z.boolean(),
})

type FormValues = z.infer<typeof schema>

function isoToDateInput(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10)
}

export function EditLinkSheet({ link }: { link: ShortLinkDto }) {
  const [open, setOpen] = useState(false)
  const mutation = useUpdateLink(link.id)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: link.title ?? '',
      expiresAt: isoToDateInput(link.expiresAt),
      isActive: link.isActive,
    },
  })

  const onSubmit = form.handleSubmit((values) => {
    // Clearing a field is not supported in v1.0 (brief sec. 7.1): only
    // send values that are present; always send the isActive toggle.
    const payload: UpdateShortLinkRequest = { isActive: values.isActive }
    if (values.title?.trim()) payload.title = values.title.trim()
    if (values.expiresAt) {
      payload.expiresAt = new Date(values.expiresAt).toISOString()
    }
    mutation.mutate(payload, {
      onSuccess: () => {
        toast.success('Link updated')
        setOpen(false)
      },
      onError: (error) => toast.error(getErrorMessage(error)),
    })
  })

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (next) form.reset({
          title: link.title ?? '',
          expiresAt: isoToDateInput(link.expiresAt),
          isActive: link.isActive,
        })
      }}
    >
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={`Edit ${link.shortCode}`}
        >
          <Pencil className="size-4" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Edit link</SheetTitle>
          <SheetDescription>
            Update the title, expiry, or active state.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={onSubmit}
            className="flex flex-1 flex-col gap-4 px-4"
            noValidate
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Untitled" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiresAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Active</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <SheetFooter className="mt-auto">
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Saving...' : 'Save changes'}
              </Button>
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
