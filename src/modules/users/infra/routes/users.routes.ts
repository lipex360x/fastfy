import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares'
import {
  RefreshTokenController,
  authController,
  createUserController,
  getUserProfileController,
} from '@/modules/users/infra/controllers'

const refeshTokenController = new RefreshTokenController()

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', createUserController)
  app.post('/session', authController)
  app.patch('/token/refresh', refeshTokenController.execute)

  app.get('/me', { onRequest: [verifyJWT] }, getUserProfileController)
}
