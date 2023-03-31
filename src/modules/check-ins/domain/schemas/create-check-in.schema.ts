import { z } from 'zod'

export const CreateCheckInParamsSchema = z.object({
  gymId: z.string(),
})

export type CreateCheckInParamsProps = z.infer<typeof CreateCheckInParamsSchema>

export const CreateCheckInBodySchema = z.object({
  latitude: z.number().refine((value) => {
    return Math.abs(value) <= 90
  }),
  longitude: z.number().refine((value) => {
    return Math.abs(value) <= 180
  }),
})

export type CreateCheckInBodyProps = z.infer<typeof CreateCheckInBodySchema>

export const CreateCheckInSchema = z
  .object({
    userId: z.string(),
  })
  .merge(CreateCheckInBodySchema)
  .merge(CreateCheckInParamsSchema)

export type CreateCheckInProps = z.infer<typeof CreateCheckInSchema>
