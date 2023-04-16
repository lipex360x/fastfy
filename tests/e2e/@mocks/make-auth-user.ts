import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

import { prisma } from '@/core/lib'

export async function makeAuthUser(app: FastifyInstance, isAdmin = false) {
  const createUser = {
    email: 'john@email.com',
    password: '123456',
  }

  await prisma.user.create({
    data: {
      name: 'Jonn Doe',
      email: createUser.email,
      password_hash: await hash(createUser.password, 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server)
    .post('/session')
    .send(createUser)

  const { token } = authResponse.body

  return { token }
}
