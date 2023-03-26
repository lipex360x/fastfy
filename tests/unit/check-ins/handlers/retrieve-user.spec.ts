import { beforeAll, describe, expect, it } from 'vitest'

import { ResourceNotFoundError } from '@/core/errors'
import { RetrieveUserHandler } from '@/modules/check-ins/application/handlers'
import { InMemoryUsersRepository } from '@/modules/users/infra/repositories/in-memory'

let usersRepository: InMemoryUsersRepository
let sut: RetrieveUserHandler

describe('RetrieveUserHandler', () => {
  beforeAll(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RetrieveUserHandler(usersRepository)
  })

  it('should not retrieve a non-existing user', async () => {
    const sutOnFail = sut.handler({
      gymId: 'gym-id',
      userId: 'non-existing-user',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(() => sutOnFail).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
