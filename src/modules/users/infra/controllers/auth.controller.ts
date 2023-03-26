import { FastifyRequest, FastifyReply } from 'fastify'

import { InvalidCredentialError } from '@/modules/users/domain/errors'

import { authFactory } from '../../domain/factories'
import { AuthSchema } from '../../domain/schemas'

export async function authController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { email, password } = AuthSchema.parse(request.body)

  try {
    const authUseCase = authFactory()

    await authUseCase.execute({ email, password })
  } catch (error) {
    if (error instanceof InvalidCredentialError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }

  return reply.status(200).send()
}
