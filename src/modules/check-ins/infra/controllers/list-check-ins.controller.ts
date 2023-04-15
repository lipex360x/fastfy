import { FastifyRequest, FastifyReply } from 'fastify'

import { listCheckInsFactory } from '../../application/factories'
import { ListCheckInsSchema } from '../../domain/schemas/list-check-ins.schema'

export class ListCheckInsController {
  async execute(request: FastifyRequest, reply: FastifyReply) {
    const { page } = ListCheckInsSchema.parse(request.body)
    const { sub: userId } = request.user
    const useCase = listCheckInsFactory()

    const { checkIns } = await useCase.execute({
      userId,
      page,
    })

    return reply.status(200).send({ checkIns })
  }
}
