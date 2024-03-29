import request from 'supertest'
import { makeAuthUser } from 'tests/e2e/@mocks'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { prisma } from '@/core/lib'
import { app } from '@/http/app'

describe('[e2e] - Create Check In', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {
    // arrange
    const { token } = await makeAuthUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'The Gym',
        description: 'gym',
        latitude: 37.2750131,
        longitude: -121.9756296,
        phone: '999',
      },
    })

    // act
    const response = await request(app.server)
      .post(`/check-in/${gym.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: 37.2750131,
        longitude: -121.9756296,
      })

    // assert
    expect(response.statusCode).toEqual(201)
  })
})
