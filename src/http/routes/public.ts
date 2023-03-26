import { FastifyInstance } from 'fastify'

import {
  authController,
  createUserController,
} from '@/modules/users/infra/controllers'

export async function publicRoutes(app: FastifyInstance) {
  app.post('/users', createUserController)
  app.post('/session', authController)
}
