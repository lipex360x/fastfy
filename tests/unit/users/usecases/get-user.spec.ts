import { makeUserDB } from 'tests/mocks'
import { beforeEach, describe, expect, it } from 'vitest'

import { ResourceNotFoundError } from '@/core/errors'
import { GetUserProfileUseCase } from '@/modules/users/application/usecases'
import { InMemoryUsersRepository } from '@/modules/users/infra/repositories'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('GetUserProfileUseCase', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })
  it('Should get user profile', async () => {
    // arrange
    const user = await usersRepository.create(await makeUserDB())

    // act
    const getUser = await sut.execute({ userId: user.id })

    // assert
    expect(getUser.user).toHaveProperty('created_at')
  })

  it('should not get profile with invalid id', async () => {
    // act
    const sutFail = sut.execute({ userId: 'invalid-id' })

    // assert
    await expect(() => sutFail).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
