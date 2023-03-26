import { CreateUserUseCase } from '../../application/usecases'
import { PrismaUsersRepository } from '../../infra/repositories/prisma'

export function createUserFactory() {
  const usersRepository = new PrismaUsersRepository()

  return new CreateUserUseCase(usersRepository)
}
