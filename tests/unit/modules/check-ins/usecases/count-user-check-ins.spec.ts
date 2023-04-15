import { makeCheckIn } from 'tests/unit/mocks'
import { beforeEach, describe, expect, it } from 'vitest'

import { CountUserCheckInsUseCase } from '@/modules/check-ins/application/usecases'
import { InMemoryCheckInsRepository } from '@/modules/check-ins/infra/repositories/in-memory'

let checkInRepository: InMemoryCheckInsRepository
let sut: CountUserCheckInsUseCase

describe('CountUserCheckInsUseCase', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new CountUserCheckInsUseCase(checkInRepository)
  })

  it('should be able to count user check-ins', async () => {
    // arrange
    await checkInRepository.create(
      makeCheckIn({ gymId: 'gym-01', userId: 'user-01' }),
    )

    await checkInRepository.create(
      makeCheckIn({ gymId: 'gym-02', userId: 'user-01' }),
    )

    await checkInRepository.create(
      makeCheckIn({ gymId: 'gym-03', userId: 'user-01' }),
    )

    // act
    const { checkInsCount } = await sut.execute({ userId: 'user-01' })

    // assert
    expect(checkInsCount).toEqual(3)
  })
})
