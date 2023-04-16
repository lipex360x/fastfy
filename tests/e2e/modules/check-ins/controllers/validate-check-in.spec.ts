import request from 'supertest'
import { makeAuthUser } from 'tests/e2e/@mocks'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { prisma } from '@/core/lib'
import { app } from '@/http/app'

describe('[e2e] - Validate Check In', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to validate a check-in', async () => {
    // arrange
    const { token } = await makeAuthUser(app, true)
    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'The Gym',
        latitude: 37.2750131,
        longitude: -121.9756296,
      },
    })

    const createCheckIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      },
    })

    // act
    const response = await request(app.server)
      .patch(`/check-in/validate/${createCheckIn.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    // assert
    expect(createCheckIn.validated_at).toBeNull()
    expect(response.statusCode).toEqual(200)
    expect(response.body.checkIn).toEqual(
      expect.objectContaining({
        validated_at: expect.any(String),
      }),
    )
  })
})
