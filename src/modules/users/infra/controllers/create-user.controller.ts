import { FastifyRequest, FastifyReply } from 'fastify'

import { UserAlreadyExistsError } from '@/modules/users/domain/errors'

import { createUserFactory } from '../../domain/factories'
import { CreateUserSchema } from '../../domain/schemas'

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { name, email, password } = CreateUserSchema.parse(request.body)

  try {
    const createUserUseCase = createUserFactory()

    const { user } = await createUserUseCase.execute({ name, email, password })

    return reply.status(201).send({
      user: {
        ...user,
        password_hash: undefined,
      },
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError)
      return reply.status(409).send({ message: error.message })

    throw error
  }
}
