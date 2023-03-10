import { hash } from 'bcryptjs'

import { prisma } from '@/lib'
import { UsersRepository } from '@/repositories'

interface RegisterRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterRequest) {
  const getExistingUser = await prisma.user.findUnique({ where: { email } })

  if (getExistingUser) throw new Error('E-mail is already exists')

  const password_hash = await hash(password, 6)

  const usersRepository = new UsersRepository()

  await usersRepository.create({ name, email, password_hash })
}
