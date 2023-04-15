import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/http/app'
describe('[e2e] - Create user', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create', async () => {
    // arrange
    const createUser = {
      name: 'Jonn Doe',
      email: 'john@email.com',
      password: '123456',
    }

    // act
    const response = await request(app.server).post('/users').send(createUser)

    // assert
    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(
      expect.objectContaining({
        user: expect.objectContaining({
          id: expect.any(String),
          created_at: expect.any(String),
        }),
      }),
    )
  })
})
