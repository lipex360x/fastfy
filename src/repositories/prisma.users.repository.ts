import { Prisma } from 'prisma/prisma-client'

import { prisma } from '@/lib'

export class PrismaUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data })

    return user
  }
}
