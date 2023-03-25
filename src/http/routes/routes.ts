import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export async function routes(app: FastifyInstance) {
  app.get('/', (_request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(200).send({ message: 'hello fastfy' })
  })
}
