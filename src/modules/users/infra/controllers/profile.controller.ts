import { FastifyRequest, FastifyReply } from 'fastify'

import { getUserProfileFactory } from '../../domain/factories'

export async function profileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserProfile = getUserProfileFactory()

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
