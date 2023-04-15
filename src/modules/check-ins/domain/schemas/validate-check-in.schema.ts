import { z } from 'zod'

export const ValidateCheckInSchema = z.object({
  checkInId: z.string().uuid(),
})

export type ValidateCheckInProps = z.infer<typeof ValidateCheckInSchema>
