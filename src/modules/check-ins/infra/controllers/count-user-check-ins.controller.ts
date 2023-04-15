import { FastifyRequest, FastifyReply } from 'fastify'

import { countUserCheckInFactory } from '../../application/factories'

export class CountUserCheckInsController {
  async execute(request: FastifyRequest, reply: FastifyReply) {
    const { sub: userId } = request.user
    const useCase = countUserCheckInFactory()

    const { checkInsCount } = await useCase.execute({ userId })

    return reply.status(200).send({ checkInsCount })
  }
}
