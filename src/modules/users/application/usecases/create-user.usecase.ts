import { hash } from 'bcryptjs'

import { UserAlreadyExistsError } from '@/modules/users/domain/errors'

import { CreateUserProps } from '../../domain/schemas'
import { IUsersRepository } from '../../infra/repositories/interfaces'

export class CreateUserUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute({ name, email, password }: CreateUserProps) {
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
