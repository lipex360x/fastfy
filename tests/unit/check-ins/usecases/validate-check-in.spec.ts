import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'

import { ResourceNotFoundError } from '@/core/errors'
import { ValidateCheckInUseCase } from '@/modules/check-ins/application/usecases'
import { LateCheckInValidateError } from '@/modules/check-ins/domain/errors'
import { InMemoryCheckInsRepository } from '@/modules/check-ins/infra/repositories/in-memory'

let checkinRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('ValidateCheckInUseCase', () => {
  beforeEach(() => {
    vi.useFakeTimers()

    checkinRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkinRepository)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    // arrange
    const createdCheckIn = await checkinRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    // act
    const { checkIn } = await sut.execute({ checkInId: createdCheckIn.id })

    // assert
    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkinRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an non-existing check-in', async () => {
    // arrange/act
    const sutOnFail = sut.execute({ checkInId: 'non-exists-check-in' })

    // assert
    await expect(() => sutOnFail).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the checkin after 20 minutes of its creation', async () => {
    // arrange
    vi.setSystemTime(new Date(2022, 0, 1, 13, 40))
    const createdCheckIn = await checkinRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const minutesInMs = 1000 * 60 * 21 // 21 minutes
    vi.advanceTimersByTime(minutesInMs)

    // act
    const sutOnFail = sut.execute({ checkInId: createdCheckIn.id })

    // arrange
    await expect(() => sutOnFail).rejects.toBeInstanceOf(
      LateCheckInValidateError,
    )
  })
})
