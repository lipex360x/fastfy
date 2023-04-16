import request from 'supertest'
import { makeAuthUser } from 'tests/e2e/@mocks'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/http/app'

describe('[e2e] - List Gyms', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list filtered gyms', async () => {
    // arrange
    const { token } = await makeAuthUser(app, true)

    await request(app.server)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'The Gym1',
        description: 'gym1',
        latitude: 37.2750131,
        longitude: -121.9756296,
        phone: '999',
      })

    await request(app.server)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'The Gym2',
        description: 'gym2',
        latitude: 37.2750131,
        longitude: -121.9756296,
        phone: '999',
      })

    // act
    const response = await request(app.server)
      .get('/gyms/list')
      .query({
        page: 1,
        q: 'Gym2',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    // assert
    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'The Gym2',
      }),
    ])
  })
})
