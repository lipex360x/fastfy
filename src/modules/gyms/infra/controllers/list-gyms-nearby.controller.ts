import { FastifyRequest, FastifyReply } from 'fastify'

import { listGymsNearbyFactory } from '../../domain/factories'
import { ListGymsNearbySchema } from '../../domain/schemas'

export async function listGymsNearbyController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { latitude, longitude } = ListGymsNearbySchema.parse(request.query)

  const useCase = listGymsNearbyFactory()

  const { gyms } = await useCase.execute({ latitude, longitude })

  return reply.status(200).send({ gyms })
}
