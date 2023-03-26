import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

import { createUserController } from '@/modules/users/infra/controllers/create-user.controller'

export async function routes(app: FastifyInstance) {
  app.post('/users', createUserController)

  app.get('/', (_request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(200).send({ message: 'hello fastfy' })
  })
}
