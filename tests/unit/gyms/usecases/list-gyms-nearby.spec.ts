import { beforeEach, describe, expect, it } from 'vitest'

import { ListGymsNearbyUseCase } from '@/modules/gyms/application/usecases'
import { InMemoryGymsRepository } from '@/modules/gyms/infra/repositories/in-memory'
import { Decimal } from '@prisma/client/runtime/library'

let gymsRepository: InMemoryGymsRepository
let sut: ListGymsNearbyUseCase

describe('ListGymsUseCase', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new ListGymsNearbyUseCase(gymsRepository)
  })

  it('should be able to list nearby gyms', async () => {
    // arrange
    await gymsRepository.create({
      id: 'gym-01',
      title: 'Near Gym',
      description: 'gym',
      latitude: new Decimal(37.127303),
      longitude: new Decimal(-121.958533),
      phone: '999',
    })

    await gymsRepository.create({
      id: 'gym-02',
      title: 'Far Gym',
      description: 'gym',
      latitude: new Decimal(-1.2046882).toNumber(),
      longitude: new Decimal(29.2292803).toNumber(),
      phone: '999',
    })

    // act
    const { gyms } = await sut.execute({
      userLatitude: 37.127068,
      userLongitude: -121.957982,
    })

    // assert
    expect(gymsRepository.items).toHaveLength(2)
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Near Gym',
        }),
      ]),
    )
  })
})
