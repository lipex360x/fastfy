import { FastifyRequest, FastifyReply } from 'fastify'

import { InvalidCredentialError } from '@/modules/users/domain/errors'
import { PrismaUsersRepository } from '@/modules/users/infra/repositories'

import { AuthSchema } from '../../domain/schemas'
import { AuthUseCase } from '../usecases'

export async function authController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { email, password } = AuthSchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()

    const authUseCase = new AuthUseCase(usersRepository)

    await authUseCase.execute({ email, password })
  } catch (error) {
    if (error instanceof InvalidCredentialError)
      return reply.status(400).send({ message: error.message })

    throw error
  }

  return reply.status(200).send()
}
