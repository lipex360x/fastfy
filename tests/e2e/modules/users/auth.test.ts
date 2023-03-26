import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/http/app'
describe('Auth (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    // arrange
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

    // act
    const response = await request(app.server).post('/session').send(userLogin)

    // assert
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
