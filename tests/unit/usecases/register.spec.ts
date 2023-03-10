import { compare } from 'bcryptjs'
import { makeUser, makeUserDB } from 'tests/mocks'
import { beforeEach, describe, expect, it } from 'vitest'

import { RegisterUseCase } from '@/modules/users/application/usecases'
import { UserAlreadyExistsError } from '@/modules/users/domain/errors'
import { InMemoryUsersRepository } from '@/modules/users/infra/repositories'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('RegisterUseCase', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })
  it('should hash user password upon registration', async () => {
    // act
    const { user } = await sut.execute(makeUser())

    // assert
    const isPasswordHashed = await compare(
      makeUser().password,
      user.password_hash,
    )

    expect(isPasswordHashed).toBeTruthy()
  })

  it('should not register a user with same email twice', async () => {
    // arrange
    await usersRepository.create(await makeUserDB())

    // act
    const sutFail = sut.execute(makeUser())

    // assert
    await expect(() => sutFail).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should register an user', async () => {
    // act
    const { user } = await sut.execute(makeUser())

    // assert
    expect(user.id).toEqual(expect.any(String))
  })
})
