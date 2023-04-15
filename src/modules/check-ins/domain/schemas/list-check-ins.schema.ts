import { z } from 'zod'

export const ListCheckInsSchema = z.object({
  page: z.coerce.number().min(1).default(1).optional(),
})

export type ListCheckInsProps = z.infer<typeof ListCheckInsSchema>
