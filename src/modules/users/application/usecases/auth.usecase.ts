import { compare } from 'bcryptjs'
import { User } from 'prisma/prisma-client'

import { InvalidCredentialError } from '../../domain/errors'
import type { AuthProps } from '../../domain/schemas'
import { IUsersRepository } from '../../infra/repositories'

interface AuthUseCaseResponse {
  user: User
}

export class AuthUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, password }: AuthProps): Promise<AuthUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) throw new InvalidCredentialError()

    const doesPasswordMatchs = await compare(password, user.password_hash)

    if (!doesPasswordMatchs) throw new InvalidCredentialError()

    return { user }
  }
}
