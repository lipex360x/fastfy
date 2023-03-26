import { z } from 'zod'

export const GetUserSchema = z.object({
  userId: z.string(),
})

export type GetUserProps = z.infer<typeof GetUserSchema>
