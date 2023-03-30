import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares'

import {
  createGymController,
  listGymsController,
  listGymsNearbyController,
} from '../controllers'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/list', listGymsController)
  app.get('/gyms/list-nearby', listGymsNearbyController)
  app.post('/gym', createGymController)
}
