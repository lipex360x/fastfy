import { PrismaGymsRepository } from '@/modules/gyms/infra/repositories/prisma'
import { PrismaUsersRepository } from '@/modules/users/infra/repositories/prisma'

import { PrismaCheckInsRepository } from '../../infra/repositories/prisma'
import {
  RetrieveUserHandler,
  RetrieveGymHandler,
  ValidateGymDistanceHandler,
  RetrieveCheckInHandler,
  CreateCheckInHandler,
} from '../handlers'
import { CreateCheckInUseCase } from '../usecases'

export function createCheckInFactory() {
  const usersRepository = new PrismaUsersRepository()
  const gymsRepository = new PrismaGymsRepository()
  const checkInRepository = new PrismaCheckInsRepository()

  const retrieveUserHandler = new RetrieveUserHandler(usersRepository)
  const retrieveGymHandler = new RetrieveGymHandler(gymsRepository)
  const validateGymDistanceHandler = new ValidateGymDistanceHandler()
  const retrieveCheckInHandler = new RetrieveCheckInHandler(checkInRepository)
  const createCheckInHandler = new CreateCheckInHandler(checkInRepository)

  return new CreateCheckInUseCase(
    retrieveUserHandler,
    retrieveGymHandler,
    validateGymDistanceHandler,
    retrieveCheckInHandler,
    createCheckInHandler,
  )
}
