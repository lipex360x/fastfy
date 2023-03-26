import { FastifyInstance } from 'fastify'

import { privateRoutes } from './private'
import { publicRoutes } from './public'

export async function routes(app: FastifyInstance) {
  publicRoutes(app)
  privateRoutes(app)
}
