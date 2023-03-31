import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares'

import { CreateCheckInController } from '../controllers'

const createCheckInController = new CreateCheckInController()

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/', createCheckInController.execute)
}
