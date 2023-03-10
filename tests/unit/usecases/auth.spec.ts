import { compare } from 'bcryptjs'
import { makeUser, makeUserDB } from 'tests/mocks'
import { describe, expect, it } from 'vitest'

import { AuthUseCase } from '@/modules/users/application/usecases'
import { InvalidCredentialError } from '@/modules/users/domain/errors'
import { InMemoryUsersRepository } from '@/modules/users/infra/repositories'

describe('AuthUseCase', () => {
  it('should authenticate', async () => {
    // arrange
    const usersRepository = new InMemoryUsersRepository()
    await usersRepository.create(await makeUserDB())

    const sut = new AuthUseCase(usersRepository)

    // act
    const { user } = await sut.execute(makeUser())

    // assert
    const isPasswordHashed = await compare(
      makeUser().password,
      user.password_hash,
    )

    expect(isPasswordHashed).toBeTruthy()
  })

  it('should not authenticate with wrong e-mail', async () => {
    // arrange
    const usersRepository = new InMemoryUsersRepository()

    const sut = new AuthUseCase(usersRepository)

    // act
    const sutFail = sut.execute(makeUser())

    // assert
    await expect(() => sutFail).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it('should not authenticate with wrong password', async () => {
    // arrange
    const usersRepository = new InMemoryUsersRepository()
    await usersRepository.create(await makeUserDB())

    const sut = new AuthUseCase(usersRepository)

    // act
    const sutFail = sut.execute(makeUser({ password: 'invalid-password' }))

    // assert
    await expect(() => sutFail).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
