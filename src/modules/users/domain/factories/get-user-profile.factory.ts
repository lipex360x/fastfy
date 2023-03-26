import { GetUserProfileUseCase } from '../../application/usecases'
import { PrismaUsersRepository } from '../../infra/repositories/prisma'

export function getUserProfileFactory() {
  const usersRepository = new PrismaUsersRepository()

  return new GetUserProfileUseCase(usersRepository)
}
