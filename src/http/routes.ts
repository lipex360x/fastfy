import { FastifyInstance } from 'fastify'

import {
  authController,
  registerController,
} from '@/modules/users/application/controllers'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/session', authController)
}
