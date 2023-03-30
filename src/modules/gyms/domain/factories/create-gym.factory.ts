import { CreateGymUseCase } from '../../application/usecases'
import { PrismaGymsRepository } from '../../infra/repositories/prisma'

export function createGymFactory() {
  const gymsRepository = new PrismaGymsRepository()

  return new CreateGymUseCase(gymsRepository)
}
