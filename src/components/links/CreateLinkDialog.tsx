import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'

import { useCreateLink } from '@/hooks/useLinks'
import { getErrorMessage } from '@/lib/problemDetails'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import type { CreateShortLinkRequest } from '@/types'

const schema = z
  .object({
    originalUrl: z
      .string()
      .min(1, 'Destination URL is required')
      .url('Enter a valid URL (including https://)'),
    title: z.string().optional(),
    customSlug: z
      .string()
      .regex(/^[a-zA-Z0-9_-]*$/, 'Use letters, numbers, - or _ only')
      .optional(),
    expiresAt: z.string().optional(),
    passwordEnabled: z.boolean(),
    password: z.string().optional(),
  })
  .refine((d) => !d.passwordEnabled || !!d.password?.length, {
    message: 'Set a password or turn off protection',
    path: ['password'],
  })

type FormValues = z.infer<typeof schema>

function toPayload(v: FormValues): CreateShortLinkRequest {
  const payload: CreateShortLinkRequest = { originalUrl: v.originalUrl }
  if (v.title?.trim()) payload.title = v.title.trim()
  if (v.customSlug?.trim()) payload.customSlug = v.customSlug.trim()
  if (v.expiresAt) payload.expiresAt = new Date(v.expiresAt).toISOString()
  if (v.passwordEnabled && v.password) payload.password = v.password
  return payload
}

export function CreateLinkDialog() {
  const [open, setOpen] = useState(false)
  const mutation = useCreateLink()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      originalUrl: '',
      title: '',
      customSlug: '',
      expiresAt: '',
      passwordEnabled: false,
      password: '',
    },
  })

  const passwordEnabled = form.watch('passwordEnabled')

  const onSubmit = form.handleSubmit((values) => {
    mutation.mutate(toPayload(values), {
      onSuccess: () => {
        toast.success('Link created')
        setOpen(false)
        form.reset()
      },
      onError: (error) => toast.error(getErrorMessage(error)),
    })
  })

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) form.reset()
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" aria-hidden="true" />
          New link
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create short link</DialogTitle>
          <DialogDescription>
            Only the destination URL is required.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="grid gap-4" noValidate>
            <FormField
              control={form.control}
              name="originalUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/very/long/link"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Marketing campaign" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customSlug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom slug (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="my-link" {...field} />
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
                  <FormLabel>Expiry date (optional)</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordEnabled"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <FormLabel>Password protection</FormLabel>
                    <FormDescription>
                      Require a password to open the link.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {passwordEnabled && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <DialogFooter>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Creating...' : 'Create link'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
