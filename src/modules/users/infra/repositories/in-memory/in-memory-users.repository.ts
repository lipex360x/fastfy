import { randomUUID } from 'crypto'
import { Prisma, User } from 'prisma/prisma-client'

import { IUsersRepository } from '../users-repository.interface'

export class InMemoryUsersRepository implements IUsersRepository {
  public users: User[] = []

  async findByEmail(email: string) {
    const user = this.users.find((item) => item.email === email)

    return user ?? null
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.users.push(user)

    return user
  }
}
