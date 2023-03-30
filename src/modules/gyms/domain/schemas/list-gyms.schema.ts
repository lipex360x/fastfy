import { z } from 'zod'

export const ListGymsSchema = z.object({
  q: z.string(),
  page: z.coerce.number().min(1).default(1).optional(),
})

export type ListGymsProps = z.infer<typeof ListGymsSchema>
