import fastify from 'fastify'
import { ZodError } from 'zod'

import { env } from './core/env'
import { appRoutes } from './http/routes'

export const app = fastify()

app.register(appRoutes)

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
