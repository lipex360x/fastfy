import request from 'supertest'
import { makeAuthUser } from 'tests/e2e/@mocks'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/http/app'

describe('[e2e] - List Gyms Nearby', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    // arrange
    const { token } = await makeAuthUser(app)

    await request(app.server)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'The Gym1',
        description: 'gym1',
        latitude: 37.127303,
        longitude: -121.958533,
        phone: '999',
      })

    await request(app.server)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'The Gym2',
        description: 'gym2',
        latitude: -1.2046882,
        longitude: 29.2292803,
        phone: '999',
      })

    // act
    const response = await request(app.server)
      .get('/gyms/list-nearby')
      .query({
        latitude: 37.127303,
        longitude: -121.958533,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    // assert
    expect(response.statusCode).toEqual(200)
  })
})
