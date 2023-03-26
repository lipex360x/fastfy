import { beforeEach, describe, expect, it } from 'vitest'

import { ListGymsUseCase } from '@/modules/gyms/application/usecases'
import { InMemoryGymsRepository } from '@/modules/gyms/infra/repositories/in-memory'
import { Decimal } from '@prisma/client/runtime/library'

let gymsRepository: InMemoryGymsRepository
let sut: ListGymsUseCase

describe('ListGymsUseCase', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new ListGymsUseCase(gymsRepository)
  })

  it('should be able to list gym by title', async () => {
    // arrange
    await gymsRepository.create({
      id: 'gym-01',
      title: 'The Gym 01',
      description: 'gym',
      latitude: new Decimal(37.2750131).toNumber(),
      longitude: new Decimal(-121.9756296).toNumber(),
      phone: '999',
    })

    await gymsRepository.create({
      id: 'gym-02',
      title: 'The Gym 02',
      description: 'gym',
      latitude: new Decimal(37.2750131).toNumber(),
      longitude: new Decimal(-121.9756296).toNumber(),
      phone: '999',
    })

    // act
    const { gyms } = await sut.execute({ query: 'Gym' })

    // assert
    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'gym-01',
        }),
        expect.objectContaining({
          id: 'gym-02',
        }),
      ]),
    )
  })

  it('should be able to list paginated gym search', async () => {
    // arrange
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        id: `gym-${i}`,
        title: `The Gym ${i}`,
        description: 'gym',
        latitude: new Decimal(37.2750131).toNumber(),
        longitude: new Decimal(-121.9756296).toNumber(),
        phone: '999',
      })
    }

    // act
    const { gyms } = await sut.execute({ query: 'Gym', page: 2 })

    // assert
    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'The Gym 21',
        }),
        expect.objectContaining({
          title: 'The Gym 22',
        }),
      ]),
    )
  })
})
