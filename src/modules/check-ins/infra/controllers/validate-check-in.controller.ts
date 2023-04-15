import { FastifyRequest, FastifyReply } from 'fastify'

import { validateCheckInFactory } from '../../application/factories'
import { ValidateCheckInSchema } from '../../domain/schemas'

export class ValidateCheckInController {
  async execute(request: FastifyRequest, reply: FastifyReply) {
    const { checkInId } = ValidateCheckInSchema.parse(request.params)

    const useCase = validateCheckInFactory()

    const { checkIn } = await useCase.execute({ checkInId })

    return reply.status(200).send({ checkIn })
  }
}
