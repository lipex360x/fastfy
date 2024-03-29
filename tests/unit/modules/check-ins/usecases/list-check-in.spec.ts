import { beforeEach, describe, expect, it } from 'vitest'

import { ListCheckInsUseCase } from '@/modules/check-ins/application/usecases'
import { InMemoryCheckInsRepository } from '@/modules/check-ins/infra/repositories/in-memory'

let checkInRepository: InMemoryCheckInsRepository
let sut: ListCheckInsUseCase

describe('ListCheckInsUseCase', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new ListCheckInsUseCase(checkInRepository)
  })

  it('should be able to list check ins', async () => {
    // arrange
    await checkInRepository.create({ gym_id: 'gym-01', user_id: 'user-01' })
    await checkInRepository.create({ gym_id: 'gym-02', user_id: 'user-01' })

    // act
    const { checkIns } = await sut.execute({ userId: 'user-01' })

    // assert
    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          gym_id: 'gym-01',
        }),
        expect.objectContaining({
          gym_id: 'gym-02',
        }),
      ]),
    )
  })

  it('should be able to list paginated check ins history', async () => {
    // arrange
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({ gym_id: `gym-${i}`, user_id: 'user-01' })
    }

    // act
    const { checkIns } = await sut.execute({ userId: 'user-01', page: 2 })

    // assert
    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          gym_id: 'gym-21',
        }),
        expect.objectContaining({
          gym_id: 'gym-22',
        }),
      ]),
    )
  })
})
