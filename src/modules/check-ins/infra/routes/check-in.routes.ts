import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares'

import {
  CreateCheckInController,
  ListCheckInsController,
  CountUserCheckInsController,
  ValidateCheckInController,
} from '../controllers'

const createCheckInController = new CreateCheckInController()
const listCheckInsController = new ListCheckInsController()
const countUserCheckInsController = new CountUserCheckInsController()
const validateCheckInController = new ValidateCheckInController()

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/check-in/:gymId', createCheckInController.execute)
  app.get('/check-ins/history', listCheckInsController.execute)
  app.get('/check-ins/metrics', countUserCheckInsController.execute)

  app.patch('/check-in/validate/:checkInId', validateCheckInController.execute)
}
