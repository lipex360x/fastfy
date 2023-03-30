import { FastifyRequest, FastifyReply } from 'fastify'

import { createGymFactory } from '../../domain/factories'
import { CreateGymSchema } from '../../domain/schemas'

export async function createGymController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { title, description, phone, latitude, longitude } =
    CreateGymSchema.parse(request.body)

  const useCase = createGymFactory()

  const { gym } = await useCase.execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  })

  return reply.status(201).send({ gym })
}
