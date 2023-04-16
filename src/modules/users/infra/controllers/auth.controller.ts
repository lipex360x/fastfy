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

    const { user } = await authUseCase.execute({ email, password })

    const token = await reply.jwtSign(
      { role: user.role },
      { sign: { sub: user.id } },
    )

    const refreshToken = await reply.jwtSign(
      { role: user.role },
      { sign: { sub: user.id, expiresIn: '7d' } },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
