import { FastifyRequest, FastifyReply } from 'fastify'

import { createCheckInFactory } from '../../application/factories'
import {
  CreateCheckInBodySchema,
  CreateCheckInParamsSchema,
} from '../../domain/schemas'

export class CreateCheckInController {
  async execute(request: FastifyRequest, reply: FastifyReply) {
    const { gymId } = CreateCheckInParamsSchema.parse(request.params)
    const { latitude, longitude } = CreateCheckInBodySchema.parse(request.body)
    const { sub: userId } = request.user

    const useCase = createCheckInFactory()

    await useCase.execute({
      gymId,
      userId,
      latitude,
      longitude,
    })
    return reply.send(201).send
  }
}
