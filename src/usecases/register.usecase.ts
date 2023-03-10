import { hash } from 'bcryptjs'

import { prisma } from '@/lib'

interface RegisterRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private readonly usersRepository: any) {}

  async execute({ name, email, password }: RegisterRequest) {
    const getExistingUser = await prisma.user.findUnique({ where: { email } })

    if (getExistingUser) throw new Error('E-mail is already exists')

    const password_hash = await hash(password, 6)

    await this.usersRepository.create({ name, email, password_hash })
  }
}
