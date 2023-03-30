import { ListGymsUseCase } from '../../application/usecases'
import { PrismaGymsRepository } from '../../infra/repositories/prisma'

export function listGymsFactory() {
  const gymsRepository = new PrismaGymsRepository()

  return new ListGymsUseCase(gymsRepository)
}
