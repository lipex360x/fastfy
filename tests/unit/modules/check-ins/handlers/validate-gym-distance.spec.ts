import { makeGym, makeUserDB } from 'tests/unit/mocks'
import { beforeEach, describe, expect, it } from 'vitest'

import { ValidateGymDistanceHandler } from '@/modules/check-ins/application/handlers'
import { MaxDistanceError } from '@/modules/users/domain/errors'
import { Decimal } from '@prisma/client/runtime/library'

let sut: ValidateGymDistanceHandler

describe('ValidateGymDistance', () => {
  beforeEach(() => {
    sut = new ValidateGymDistanceHandler()
  })

  it('should not be able to check in on distant gym', async () => {
    // arrange
    const retrieveGym = makeGym()
    const { id: userId } = await makeUserDB()

    // act
    const sutOnFail = sut.handler({
      request: {
        userId,
        gymId: retrieveGym.id,
        latitude: 37.1193142,
        longitude: -121.951813,
      },
      retrieveGym,
    })

    // assert
    await expect(() => sutOnFail).rejects.toBeInstanceOf(MaxDistanceError)
  })

  it('should be able to go to next step if distances is valid', async () => {
    const { id: userId } = await makeUserDB()

    const retrieveGym = {
      id: 'gym-id',
      title: 'The Gym',
      description: 'gym',
      latitude: new Decimal(37.127303),
      longitude: new Decimal(-121.958533),
      phone: '999',
    }

    // act
    const validSut = await sut.handler({
      request: {
        gymId: retrieveGym.id,
        userId,
        latitude: 37.127068,
        longitude: -121.957982,
      },
      retrieveGym,
    })

    // assert
    expect(validSut).toBeTruthy()
  })
})
