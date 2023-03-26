import { compare } from 'bcryptjs'

import { InvalidCredentialError } from '../../domain/errors'
import { IUsersRepository } from '../../infra/repositories'

interface RequestProps {
  email: string
  password: string
}

export class AuthUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, password }: RequestProps) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) throw new InvalidCredentialError()

    const doesPasswordMatchs = await compare(password, user.password_hash)

    if (!doesPasswordMatchs) throw new InvalidCredentialError()

    return { user }
  }
}
