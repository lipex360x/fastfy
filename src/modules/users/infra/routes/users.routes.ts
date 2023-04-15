import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares'
import {
  authController,
  createUserController,
  getUserProfileController,
} from '@/modules/users/infra/controllers'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', createUserController)
  app.post('/session', authController)

  app.get('/me', { onRequest: [verifyJWT] }, getUserProfileController)
}
