import { makeUserDB } from 'tests/unit/mocks'
import { beforeEach, describe, expect, it } from 'vitest'

import { ResourceNotFoundError } from '@/core/errors'
import { RetrieveGymHandler } from '@/modules/check-ins/application/handlers'
import { InMemoryGymsRepository } from '@/modules/gyms/infra/repositories/in-memory'
import { Decimal } from '@prisma/client/runtime/library'

let gymRepository: InMemoryGymsRepository
let sut: RetrieveGymHandler

describe('RetrieveGym', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new RetrieveGymHandler(gymRepository)
  })

  it('should not be able to retrieve a non-exists gym', async () => {
    // arrange

    const user = await makeUserDB()

    // act
    const sutOnFail = sut.handler({
      userId: user.id,
      gymId: 'gym-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    // assert
    await expect(() => sutOnFail).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should be able to go to next step if gym exists', async () => {
    // arrange
    const gym = await gymRepository.create({
      title: 'The Gym',
      description: 'gym',
      latitude: new Decimal(37.127303),
      longitude: new Decimal(-121.958533),
      phone: '999',
    })

    const user = await makeUserDB()

    // act
    const handlerResponse = await sut.handler({
      userId: user.id,
      gymId: gym.id,
      userLatitude: 0,
      userLongitude: 0,
    })

    // assert
    expect(handlerResponse).toBeTruthy()
  })
})
