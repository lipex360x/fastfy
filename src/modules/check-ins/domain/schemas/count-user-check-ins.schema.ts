import { z } from 'zod'

export const CountUserCheckInsSchema = z.object({
  userId: z.coerce.number().min(1).default(1).optional(),
})

export type CountUserCheckInsProps = z.infer<typeof CountUserCheckInsSchema>
