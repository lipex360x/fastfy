import { z } from 'zod'

export const CreateUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

export type CreateUserProps = z.infer<typeof CreateUserSchema>
