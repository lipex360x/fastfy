import { z } from 'zod'

export const AuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export type AuthProps = z.infer<typeof AuthSchema>
