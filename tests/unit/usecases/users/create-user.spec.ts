import { makeUser, makeUserDB } from 'tests/unit/mocks'
import { beforeEach, describe, expect, it } from 'vitest'

import { CreateUserUseCase } from '@/modules/users/application/usecases'
import { UserAlreadyExistsError } from '@/modules/users/domain/errors'
import { InMemoryUsersRepository } from '@/modules/users/infra/repositories'

let usersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('CreateUserUseCase', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(usersRepository)
  })
  it('Should register an user', async () => {
    // arrange
    const newUser = makeUser()

    // act
    const { user } = await sut.execute(newUser)

    // assert
    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to register an user with same e-mail', async () => {
    // arrange
    const newUser = makeUser()
    await usersRepository.create(await makeUserDB(newUser))

    // act
    const sutFail = sut.execute(newUser)

    // assert
    await expect(() => sutFail).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
