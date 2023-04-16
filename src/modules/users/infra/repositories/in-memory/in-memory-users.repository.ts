import { randomUUID } from 'crypto'
import { Prisma, Role, User } from 'prisma/prisma-client'

import { IUsersRepository } from '../interfaces/users-repository.interface'

export class InMemoryUsersRepository implements IUsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      role: 'ADMIN' as Role,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    return user ?? null
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    return user ?? null
  }
}
