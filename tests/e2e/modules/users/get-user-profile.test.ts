import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/http/app'
describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to retrieve a profile', async () => {
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
    const authResponse = await request(app.server)
      .post('/session')
      .send(userLogin)

    const { token } = authResponse.body

    // act
    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    // assert
    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body).toEqual(
      expect.objectContaining({
        user: expect.objectContaining({
          id: expect.any(String),
          created_at: expect.any(String),
          email: createUser.email,
        }),
      }),
    )
  })
})
