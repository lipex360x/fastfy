import { FastifyRequest, FastifyReply } from 'fastify'

import { UserAlreadyExistsError } from '@/modules/users/domain/errors'

import { UserSchema } from '../../domain/schemas'
import { makeRegisterFactory } from '../factories'

export async function registerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { name, email, password } = UserSchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterFactory()

    await registerUseCase.execute({ name, email, password })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError)
      return reply.status(409).send({ message: error.message })

    throw error
  }

  return reply.status(201).send()
}
