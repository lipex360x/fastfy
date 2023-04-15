import { makeCheckIn, makeUserDB } from 'tests/unit/mocks'
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'

import { RetrieveCheckInHandler } from '@/modules/check-ins/application/handlers'
import { MaxNumberOfCheckInError } from '@/modules/check-ins/domain/errors'
import { InMemoryCheckInsRepository } from '@/modules/check-ins/infra/repositories/in-memory'
import { InMemoryUsersRepository } from '@/modules/users/infra/repositories/in-memory'

let checkinRepository: InMemoryCheckInsRepository
let usersRepository: InMemoryUsersRepository
let sut: RetrieveCheckInHandler

describe('RetrieveCheckIn', () => {
  beforeEach(() => {
    vi.useFakeTimers()

    checkinRepository = new InMemoryCheckInsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new RetrieveCheckInHandler(checkinRepository)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should not be able to go to next step if check in is in the same day', async () => {
    // arrange
    vi.setSystemTime(new Date(2022, 0, 1, 8, 0, 0))

    const user = await usersRepository.create(await makeUserDB())

    await checkinRepository.create(
      makeCheckIn({ gymId: 'gym-id', userId: user.id }),
    )

    // act
    const handlerResponse = sut.handler({
      request: {
        userId: user.id,
        gymId: 'gim-id',
        userLatitude: 0,
        userLongitude: 0,
      },
    })

    // assert
    await expect(() => handlerResponse).rejects.toBeInstanceOf(
      MaxNumberOfCheckInError,
    )
  })

  it('should be able to go to next step if check in is in the different day', async () => {
    // arrange
    vi.setSystemTime(new Date(2022, 0, 1))

    const user = await usersRepository.create(await makeUserDB())

    await checkinRepository.create(
      makeCheckIn({ gymId: 'gym-id', userId: user.id }),
    )

    vi.setSystemTime(new Date(2022, 0, 2))

    // act
    const handlerResponse = await sut.handler({
      request: {
        userId: user.id,
        gymId: 'gim-id',
        userLatitude: 0,
        userLongitude: 0,
      },
    })

    // assert
    expect(handlerResponse).toBeTruthy()
  })
})
