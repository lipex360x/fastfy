import { FastifyInstance } from 'fastify'

import {
  authController,
  createUserController,
  profileController,
} from '@/modules/users/infra/controllers'

export async function routes(app: FastifyInstance) {
  app.post('/users', createUserController)
  app.post('/session', authController)

  // Authenticated
  app.get('/me', profileController)
}
