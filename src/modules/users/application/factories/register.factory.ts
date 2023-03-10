import { PrismaUsersRepository } from '../../infra/repositories'
import { RegisterUseCase } from '../usecases'

export function makeRegisterFactory() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
