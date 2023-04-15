import { FastifyRequest, FastifyReply } from 'fastify'

import { listGymsFactory } from '../../domain/factories'
import { ListGymsSchema } from '../../domain/schemas'

export async function listGymsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { page, q } = ListGymsSchema.parse(request.query)

  const useCase = listGymsFactory()

  const { gyms } = await useCase.execute({
    page,
    q,
  })

  return reply.status(200).send({ gyms })
}
