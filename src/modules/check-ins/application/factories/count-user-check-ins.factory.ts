import { PrismaCheckInsRepository } from '../../infra/repositories/prisma'
import { CountUserCheckInsUseCase } from '../usecases'

export function countUserCheckInFactory() {
  const checkInRepository = new PrismaCheckInsRepository()

  return new CountUserCheckInsUseCase(checkInRepository)
}
