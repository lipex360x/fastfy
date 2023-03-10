import { z } from 'zod'

export const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

export type UserProps = z.infer<typeof UserSchema>
