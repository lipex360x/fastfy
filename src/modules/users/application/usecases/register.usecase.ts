import { hash } from 'bcryptjs'
import type { User } from 'prisma/prisma-client'

import { UserAlreadyExistsError } from '@/modules/users/domain/errors'
import { IUsersRepository } from '@/modules/users/infra/repositories'

import type { UserProps } from '../../domain/schemas'

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: UserProps): Promise<RegisterUseCaseResponse> {
    const getExistingUser = await this.usersRepository.findByEmail(email)

    if (getExistingUser) throw new UserAlreadyExistsError()

    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return { user }
  }
}
