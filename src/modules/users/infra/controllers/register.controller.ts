import { FastifyRequest, FastifyReply } from 'fastify'

import { UserAlreadyExistsError } from '@/core/errors'
import { PrismaUsersRepository } from '@/modules/users/infra/repositories'

import { RegisterUseCase } from '../../application/usecases'
import { UserSchema } from '../../domain/schemas'

export async function registerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { name, email, password } = UserSchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()

    const registerUseCase = new RegisterUseCase(usersRepository)

    await registerUseCase.execute({ name, email, password })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError)
      return reply.status(409).send({ message: error.message })

    throw error
  }

  return reply.status(201).send()
}
