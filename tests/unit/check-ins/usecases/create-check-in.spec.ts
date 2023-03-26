import { makeUserDB } from 'tests/mocks'
import { beforeAll, describe, expect, it } from 'vitest'

import {
  CreateCheckInHandler,
  RetrieveCheckInHandler,
  RetrieveGymHandler,
  RetrieveUserHandler,
  ValidateGymDistanceHandler,
} from '@/modules/check-ins/application/handlers'
import { CreateCheckInUseCase } from '@/modules/check-ins/application/usecases'
import { InMemoryCheckInsRepository } from '@/modules/check-ins/infra/repositories/in-memory'
import { InMemoryGymsRepository } from '@/modules/gyms/infra/repositories/in-memory'
import { InMemoryUsersRepository } from '@/modules/users/infra/repositories'
import { Decimal } from '@prisma/client/runtime/library'

let checkinRepository: InMemoryCheckInsRepository
let gymRepository: InMemoryGymsRepository
let usersRepository: InMemoryUsersRepository

let retrieveUserHandler: RetrieveUserHandler
let retrieveGymHandler: RetrieveGymHandler
let retrieveCheckInHandler: RetrieveCheckInHandler
let validateGymDistanceHandler: ValidateGymDistanceHandler
let createCheckInHandler: CreateCheckInHandler

let sut: CreateCheckInUseCase

describe('CreateCheckInUseCase', () => {
  beforeAll(async () => {
    usersRepository = new InMemoryUsersRepository()
    checkinRepository = new InMemoryCheckInsRepository()
    gymRepository = new InMemoryGymsRepository()

    retrieveUserHandler = new RetrieveUserHandler(usersRepository)
    retrieveGymHandler = new RetrieveGymHandler(gymRepository)
    validateGymDistanceHandler = new ValidateGymDistanceHandler()
    retrieveCheckInHandler = new RetrieveCheckInHandler(checkinRepository)
    createCheckInHandler = new CreateCheckInHandler(checkinRepository)

    sut = new CreateCheckInUseCase(
      retrieveUserHandler,
      retrieveGymHandler,
      validateGymDistanceHandler,
      retrieveCheckInHandler,
      createCheckInHandler,
    )
  })
  it('should be able to check in', async () => {
    // arrange
    const user = await usersRepository.create(await makeUserDB())
    const gym = await gymRepository.create({
      title: 'The Gym',
      description: 'gym',
      latitude: new Decimal(37.127303),
      longitude: new Decimal(-121.958533),
      phone: '999',
    })

    // act
    const { checkIn } = await sut.execute({
      userId: user.id,
      gymId: gym.id,
      userLatitude: 37.127068,
      userLongitude: -121.957982,
    })

    // assert
    expect(checkIn).toBeTruthy()
    expect(checkIn).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )
  })
})
