import { PrismaCheckInsRepository } from '../../infra/repositories/prisma'
import { ValidateCheckInUseCase } from '../usecases'

export function validateCheckInFactory() {
  const checkInRepository = new PrismaCheckInsRepository()

  return new ValidateCheckInUseCase(checkInRepository)
}
