import request from 'supertest'
import { makeAuthUser } from 'tests/e2e/utils'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/http/app'
describe('[e2e] - Get User Profile', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to retrieve a profile', async () => {
    // arrange
    const { token } = await makeAuthUser(app)

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
        }),
      }),
    )
  })
})
