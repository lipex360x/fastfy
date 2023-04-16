import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/http/app'

describe('[e2e] - Refresh Token', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
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
    const authResponse = await request(app.server)
      .post('/session')
      .send(userLogin)

    const cookies = authResponse.get('Set-Cookie')
    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    // assert
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
