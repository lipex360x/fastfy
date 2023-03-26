import { CreateUserUseCase } from '../../application/usecases'
import { PrismaUsersRepository } from '../../infra/repositories'

export function createUserFactory() {
  const usersRepository = new PrismaUsersRepository()

  return new CreateUserUseCase(usersRepository)
}
