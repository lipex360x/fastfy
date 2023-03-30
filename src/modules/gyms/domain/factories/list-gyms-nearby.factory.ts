import { ListGymsNearbyUseCase } from '../../application/usecases'
import { PrismaGymsRepository } from '../../infra/repositories/prisma'

export function listGymsNearbyFactory() {
  const gymsRepository = new PrismaGymsRepository()

  return new ListGymsNearbyUseCase(gymsRepository)
}
