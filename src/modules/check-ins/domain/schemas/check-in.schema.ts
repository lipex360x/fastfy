import { z } from 'zod'

export const CheckInSchema = z.object({
  userId: z.string(),
  gymId: z.string(),
  userLatitude: z.number(),
  userLongitude: z.number(),
})

export type CheckInProps = z.infer<typeof CheckInSchema>
