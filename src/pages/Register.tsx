import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { register } from '@/api/auth'
import { useAuth } from '@/hooks/useAuth'
import { getErrorMessage } from '@/lib/problemDetails'
import { AuthCard } from '@/components/auth/AuthCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

// confirmPassword is client-only (the backend takes { email, password });
// .refine cross-checks the two fields and reports on confirmPassword.
const registerSchema = z
  .object({
    email: z.string().email('Enter a valid email address'),
    password: z.string().min(8, 'Use at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type RegisterValues = z.infer<typeof registerSchema>

export function Register() {
  const navigate = useNavigate()
  const { setSessionFromAuth } = useAuth()

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  })

  const mutation = useMutation({
    mutationFn: (values: RegisterValues) =>
      register({ email: values.email, password: values.password }),
    onSuccess: (auth) => {
      setSessionFromAuth(auth)
      navigate('/', { replace: true })
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  const onSubmit = form.handleSubmit((values) => mutation.mutate(values))

  return (
    <AuthCard
      title="Create account"
      description="Start shortening and tracking your links."
      footer={
        <span>
          Already registered?{' '}
          <Link
            to="/login"
            className="text-foreground font-medium underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </span>
      }
    >
      <Form {...form}>
        <form onSubmit={onSubmit} className="grid gap-4" noValidate>
          {mutation.isError && (
            <p
              role="alert"
              className="text-destructive bg-destructive/10 rounded-md px-3 py-2 text-sm"
            >
              {getErrorMessage(mutation.error)}
            </p>
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
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

          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Creating account...' : 'Create account'}
          </Button>
        </form>
      </Form>
    </AuthCard>
  )
}
