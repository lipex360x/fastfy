import { hash } from 'bcryptjs'

import { IUsersRepository } from '@/repositories'

interface RegisterRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute({ name, email, password }: RegisterRequest) {
    const getExistingUser = await this.usersRepository.findByEmail(email)

    if (getExistingUser) throw new Error('E-mail is already exists')

    const password_hash = await hash(password, 6)

    await this.usersRepository.create({ name, email, password_hash })
  }
}
