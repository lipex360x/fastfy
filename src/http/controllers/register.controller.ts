import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { PrismaUsersRepository } from '@/repositories'
import { RegisterUseCase } from '@/usecases'

export async function registerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()

    const registerUseCase = new RegisterUseCase(usersRepository)

    await registerUseCase.execute({ name, email, password })
  } catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
