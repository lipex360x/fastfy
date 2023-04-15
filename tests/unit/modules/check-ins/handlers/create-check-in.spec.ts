import { makeUserDB } from 'tests/unit/@mocks'
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'

import { CreateCheckInHandler } from '@/modules/check-ins/application/handlers'
import { InMemoryCheckInsRepository } from '@/modules/check-ins/infra/repositories/in-memory'
import { InMemoryUsersRepository } from '@/modules/users/infra/repositories/in-memory'

let checkinRepository: InMemoryCheckInsRepository
let usersRepository: InMemoryUsersRepository
let sut: CreateCheckInHandler

describe('CreateCheckIn', () => {
  beforeEach(() => {
    vi.useFakeTimers()

    checkinRepository = new InMemoryCheckInsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateCheckInHandler(checkinRepository)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    // arrange
    vi.setSystemTime(new Date(2022, 0, 1))
    const user = await usersRepository.create(await makeUserDB())

    // act
    const checkIn = await sut.handler({
      request: {
        userId: user.id,
        gymId: 'gim-id',
        latitude: 0,
        longitude: 0,
      },
    })

    // assert
    expect(checkIn).toBeTruthy()
    expect(checkIn.id).toEqual(expect.any(String))
  })
})
