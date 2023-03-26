import { PrismaCheckInsRepository } from '../../infra/repositories/prisma'
import { ListCheckInsUseCase } from '../usecases'

export function listCheckInsFactory() {
  const checkInRepository = new PrismaCheckInsRepository()

  return new ListCheckInsUseCase(checkInRepository)
}
