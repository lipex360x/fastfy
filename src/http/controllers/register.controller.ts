import { FastifyRequest, FastifyReply } from 'fastify'

import { PrismaUsersRepository } from '@/repositories'
import { UserSchema } from '@/schemas'
import { RegisterUseCase } from '@/usecases'
import { UserAlreadyExistsError } from '@/usecases/errors'

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
