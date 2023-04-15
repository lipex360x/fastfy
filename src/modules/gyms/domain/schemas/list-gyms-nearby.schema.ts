import { z } from 'zod'

export const ListGymsNearbySchema = z.object({
  latitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 90
  }),
  longitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 180
  }),
})

export type ListGymsNearbyProps = z.infer<typeof ListGymsNearbySchema>
