import { FastifyInstance } from 'fastify'

import { verifyJWT, verifyUserRole } from '@/http/middlewares'

import {
  createGymController,
  listGymsController,
  listGymsNearbyController,
} from '../controllers'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post(
    '/gym',
    { onRequest: [verifyUserRole('ADMIN')] },
    createGymController,
  )

  app.get('/gyms/list', listGymsController)
  app.get('/gyms/list-nearby', listGymsNearbyController)
}
