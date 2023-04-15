import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthUserHelper(app: FastifyInstance) {
  const createUser = {
    name: 'Jonn Doe',
    email: 'john@email.com',
    password: '123456',
  }
  await request(app.server).post('/users').send(createUser)

  const userLogin = {
    email: createUser.email,
    password: createUser.password,
  }

  const authResponse = await request(app.server)
    .post('/session')
    .send(userLogin)

  const { token } = authResponse.body

  return { token }
}
