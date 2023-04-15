import { FastifyRequest, FastifyReply } from 'fastify'

export class ValidateCheckInController {
  async execute(request: FastifyRequest, reply: FastifyReply) {
    return reply.send(201).send
  }
}
