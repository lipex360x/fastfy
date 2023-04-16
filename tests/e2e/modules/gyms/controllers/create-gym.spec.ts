import request from 'supertest'
import { makeAuthUser } from 'tests/e2e/@mocks'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/http/app'

describe('[e2e] - Create Gym', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a Gym', async () => {
    // arrange
    const { token } = await makeAuthUser(app, true)

    // act
    const response = await request(app.server)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'The Gym',
        description: 'gym',
        latitude: 37.2750131,
        longitude: -121.9756296,
        phone: '999',
      })

    // assert
    expect(response.statusCode).toEqual(201)
  })
})
