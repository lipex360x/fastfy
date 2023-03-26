import { AuthUseCase } from '../../application/usecases'
import { PrismaUsersRepository } from '../../infra/repositories'

export function authFactory() {
  const usersRepository = new PrismaUsersRepository()

  return new AuthUseCase(usersRepository)
}
