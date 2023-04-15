import request from 'supertest'
import { makeAuthUser } from 'tests/e2e/@mocks'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { prisma } from '@/core/lib'
import { app } from '@/http/app'

describe('[e2e] - Count User Check-ins', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to count user check-ins', async () => {
    // arrange
    const { token } = await makeAuthUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'The Gym',
        description: 'gym',
        latitude: 37.2750131,
        longitude: -121.9756296,
        phone: '999',
      },
    })

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: user.id,
        },
        {
          gym_id: gym.id,
          user_id: user.id,
        },
      ],
    })

    // act
    const response = await request(app.server)
      .get('/check-ins/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send()

    // assert
    expect(response.statusCode).toEqual(200)
    expect(response.body.checkInsCount).toEqual(2)
  })
})
