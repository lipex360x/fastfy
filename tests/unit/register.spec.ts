import { compare } from 'bcryptjs'
import { makeUser } from 'tests/mocks'
import { describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories'
import { UserAlreadyExistsError } from '@/usecases/errors'

import { RegisterUseCase } from '../../src/usecases/register.usecase'

describe('RegisterUseCase', () => {
  it('should hash user password upon registration', async () => {
    // arrange
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    // act
    const { user } = await registerUseCase.execute(makeUser())

    // assert
    const isPasswordHashed = await compare(
      makeUser().password,
      user.password_hash,
    )

    expect(isPasswordHashed).toBeTruthy()
  })

  it('should not register a user with same email twice', async () => {
    // arrange
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    // act
    await registerUseCase.execute(makeUser())

    // assert
    await expect(() =>
      registerUseCase.execute(makeUser()),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should register an user', async () => {
    // arrange
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    // act
    const { user } = await registerUseCase.execute(makeUser())

    // assert
    expect(user.id).toEqual(expect.any(String))
  })
})
