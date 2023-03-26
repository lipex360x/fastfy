import { Prisma } from 'prisma/prisma-client'

import { prisma } from '@/core/lib'

import { IUsersRepository } from '../interfaces/users-repository.interface'

export class PrismaUsersRepository implements IUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data })

    return user
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } })
  }
}
