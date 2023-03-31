import { FastifyRequest, FastifyReply } from 'fastify'

export async function countUserCheckInsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  return reply.send(201).send
}
