import { z } from 'zod'

export const ListGymsNearbySchema = z.object({
  latitude: z.number().refine((value) => {
    return Math.abs(value) <= 90
  }),
  longitude: z.number().refine((value) => {
    return Math.abs(value) <= 180
  }),
})

export type ListGymsNearbyProps = z.infer<typeof ListGymsNearbySchema>
