import { FastifyInstance } from 'fastify'

import { profileController } from '@/modules/users/infra/controllers'

import { verifyJWT } from '../middlewares'

export async function privateRoutes(app: FastifyInstance) {
  app.get('/me', { onRequest: [verifyJWT] }, profileController)
}
