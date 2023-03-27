import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
}
