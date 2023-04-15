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
    await checkInRepository.create({ gym_id: 'gym-01', user_id: 'user-01' })
    await checkInRepository.create({ gym_id: 'gym-02', user_id: 'user-01' })
    await checkInRepository.create({ gym_id: 'gym-03', user_id: 'user-01' })

    // act
    const { checkInsCount } = await sut.execute({ userId: 'user-01' })

    // assert
    expect(checkInsCount).toEqual(3)
  })
})
