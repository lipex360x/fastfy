import { PrismaUsersRepository } from '../../infra/repositories'
import { AuthUseCase } from '../usecases'

export function makeAuthFactory() {
  const usersRepository = new PrismaUsersRepository()
  const authUseCase = new AuthUseCase(usersRepository)

  return authUseCase
}
