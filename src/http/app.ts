import fastify from 'fastify'
import { ZodError } from 'zod'

import { env } from '@/core/env'
import { gymsRoutes } from '@/modules/gyms/infra/routes'
import { usersRoutes } from '@/modules/users/infra/routes'
import fastifyJwt from '@fastify/jwt'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(usersRoutes)
app.register(gymsRoutes)

app.setErrorHandler((error, _request, replay) => {
  if (error instanceof ZodError) {
    return replay
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: external tool like Datadog/Newrelic/Sentry
  }

  return replay.status(500).send({
    message: 'Internal server error',
  })
})
